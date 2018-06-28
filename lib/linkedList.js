'use strict';
const assert = require('assert');

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(value) {
        this.tail = {
            list: this,
            prev: this.tail,
            next: null,
            value,
        };
        if (this.tail.prev)
            this.tail.prev.next = this.tail;

        this.head = this.head || this.tail;
        return this.tail;
    }

    pushNode(node) {
        node.list = this;
        node.prev = this.tail;
        if (this.tail)
            this.tail.next = node;
        this.tail = node;
        this.head = this.head || node;
    }

    pop() {
        if (this.tail === null) {
            throw new Error('list is empty');
        }

        const node = this.tail;
        this.tail = this.tail.prev;
        if (this.tail === null)
            this.head = null;
        else
            this.tail.next = null;

        node.list = null;
        node.prev = null;

        return node.value;
    }

    unshift(value) {
        this.head = {
            list: this,
            prev: null,
            next: this.head,
            value,
        };

        if (this.head.next)
            this.head.next.prev = this.head;

        this.tail = this.tail || this.head;
        return this.head;
    }

    unshiftNode(node) {
        node.list = this;
        node.next = this.head;
        if (this.head)
            this.head.prev = node;
        this.head = node;
        this.tail = this.tail || node;
    }

    shift() {
        if (this.head === null) {
            throw new Error('list is empty');
        }

        const node = this.head;
        this.head = this.head.next;
        if (this.head === null)
            this.tail = null;
        else
            this.head.prev = null;
        node.list = null;
        node.prev = null;

        return node.value;
    }

    removeNode(node) {
        assert(node.list === this, 'Node must be in the list');

        if (node.prev)
            node.prev.next = node.next;
        else
            this.head = node.next;

        if (node.next)
            node.next.prev = node.prev;
        else
            this.tail = node.prev;
;
        node.list = null;
        node.prev = null;
        node.next = null;
    }

    insertNodeAfter(node, nodeToInsert) {
        assert(node.list === this, 'Node must be in the list');
        assert(nodeToInsert.list === this, 'Node must be in the list');

        node.list = this;
        nodeToInsert.prev = node;
        nodeToInsert.next = node.next;
        node.next = nodeToInsert;
        if (nodeToInsert.next)
            nodeToInsert.next.prev = nodeToInsert;

        return nodeToInsert;
    }

    insertNodeBefore(node, nodeToInsert) {
        assert(node.list === this, 'Node must be in the list');
        assert(nodeToInsert.list === this, 'Node must be in the list');

        node.list = this;
        nodeToInsert.next = node;
        nodeToInsert.prev = node.prev;
        node.prev = nodeToInsert;
        if (nodeToInsert.prev)
            nodeToInsert.prev.next = nodeToInsert;

        return nodeToInsert;
    }

    insertValueAfter(node, value) {
        const newNode = {
            list: this,
            prev: null,
            next: null,
            value,
        }

        return this.insertNodeAfter(node, newNode);
    }

    insertValueBefore(node, value) {
        const newNode = {
            list: this,
            prev: null,
            next: null,
            value,
        }

        return this.insertNodeAfter(node, newNode);
    }

    dump() {
        let current = this.head;
        while( current) {
            console.log("###", current.value, "###");
            current = current.next;
        }
    }

}

module.exports = LinkedList;
