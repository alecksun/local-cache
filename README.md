# local-cache
a cache to be used local
```
const cache = new Cache(100); // create a cache that can store 100 items;

cache.set('key-1', 'value-1'); // add a hash key to cache

value = cache.get('key-1'); // read a cached item, will be 'value-1'
value = cache.get('key-2'); // read a cached item, will be undefined

cache.set('key-2', 'value-2', 60); // add a hash key to cache, with TTL = 60 seconds

```
Highlights:
- Once cache is full, the least recent used item will be discarded when a new key is added
- No timer task to remove expired keys
- Removing expired keys only happens when read it or the cache is full
