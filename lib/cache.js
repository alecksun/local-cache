'use strict';
const LinkedList = require('./linkedList');

class Cache {
    constructor (capacity) {
        this.capacity = capacity;
        this.size = 0;
        this._hash = {};
        this._lruList = new LinkedList();
        this._ttlList = new LinkedList();
    }

    set(key, value, ttl) {
        const expire = ttl ? Date.now() + 1000 * ttl : null;

        let cacheNode = this._hash[key]
        if (cacheNode) {
            cacheNode.value = value;
            this.LRUUpdate(cacheNode);
            this.TTLUpdate(key, cacheNode, expire);
        } else {
            if (this.size === this.capacity) {
                this.lruRemoveOne();
            }
            this.size++;

            cacheNode = {
                value,
                expire,
                lruNode: this.LRUInsert(key),
                ttlNode: ttl ? this.TTLInsert(key, expire) : null
            }
            this._hash[key] = cacheNode;
        }
    }

    get(key) {
        let cacheNode = this._hash[key]
        let value;
        if (cacheNode) {
            if (cacheNode.expire && cacheNode.expire < Date.now()) {
                this.remove(key)
            } else {
                value = cacheNode.value;
                this.LRUUpdate(cacheNode);
            }
        }
        return value;
    }

    remove(key) {
        let cacheNode = this._hash[key]
        if (!cacheNode)
            return;

        this.LRURemove(cacheNode);
        delete this._hash[key];
        this.size --;
    }

    LRUUpdate(cacheNode) {
        this._lruList.removeNode(cacheNode.lruNode);
        this._lruList.pushNode(cacheNode.lruNode);
    }

    LRUInsert(key) {
        return this._lruList.push(key);
    }

    LRURemove(cacheNode) {
        this._lruList.removeNode(cacheNode.lruNode);
        if (cacheNode.ttlNode)
            this._ttlList.removeNode(cacheNode.ttlNode);
    }

    lruRemoveOne() {
        // clean expired objects
        let cleared = this.clean();

        if (!cleared) {
            const key = this._lruList.shift();
            delete this._hash[key];
            this.size --;
        }
    }

    clean(max = 100) {
        // clean expired objects
        let cleared = 0;
        const now = Date.now();
        let cur = this._ttlList.head;
        while (this._ttlList.head && this._ttlList.head.value.expire < now && cleared < max) {
            const key = this._ttlList.shift().key;
            delete this._hash[key];
            this.size --;
            cleared ++;
        }

        return cleared;
    }

    TTLInsert(key, expire) {
        let cur = this._ttlList.head;
        while (cur) {
            if (cur.value.expire > expire) {
                return this._ttlList.inserValuetBefore(cur, { key, expire });
            }

            cur = cur.next;
        }

        this._ttlList.push({ key, expire });
        return;
    }

    TTLUpdate(key, cacheNode, expire) {
        if (cacheNode.ttlNode) {
            this._ttlList.removeNode(cacheNode.ttlNode);
        }

        if (expire) {
            cacheNode.ttlNode = this.TTLInsert(key, expire);
        }
    }

}

module.exports = Cache;

