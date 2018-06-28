const Cache = require('../lib/cache');

describe('cache', () => {
    it('get and set', () => {
        const cache = new Cache(10);
        cache.set('1', '1');
        cache.set('2', '2');
        cache.set('3', '3');

        expect(cache.get('1')).toBe('1');
        expect(cache.get('2')).toBe('2');
        expect(cache.get('3')).toBe('3');
    });

    it('update value', () => {
        const cache = new Cache(10);
        cache.set('1', '1');
        cache.set('2', '2');
        cache.set('3', '3');
        cache.set('2', '4');

        expect(cache.get('1')).toBe('1');
        expect(cache.get('2')).toBe('4');
        expect(cache.get('3')).toBe('3');
    });

    it('get and set after cache full', () => {
        const cache = new Cache(5);
        cache.set('1', '1');
        cache.set('2', '2');
        cache.set('3', '3');
        cache.set('4', '4');
        cache.set('5', '5');
        cache.set('6', '6');
        cache.set('7', '7');

        expect(cache.get('1')).toBe(undefined);
        expect(cache.get('2')).toBe(undefined);
        expect(cache.get('3')).toBe('3');
        expect(cache.get('4')).toBe('4');
        expect(cache.get('5')).toBe('5');
        expect(cache.get('6')).toBe('6');
        expect(cache.get('7')).toBe('7');
    });

    it('remove a value', () => {
        const cache = new Cache(5);
        cache.set('1', '1');
        cache.set('2', '2');
        cache.set('3', '3');
        cache.set('4', '4');
        cache.set('5', '5');
        cache.remove('5');
        cache.set('1');

        expect(cache.get('1')).toBe(undefined);
        expect(cache.get('3')).toBe('3');
        expect(cache.get('4')).toBe('4');
        expect(cache.get('5')).toBe(undefined);
    });

    it('set after cache expire', () => {
        const cache = new Cache(5);
        cache.set('1', '1');
        cache.set('2', '2');
        cache.set('3', '3', -1);
        cache.set('4', '4', -1);
        cache.set('5', '5');


        cache.set('6', '6');

        expect(cache.get('1')).toBe('1');
        expect(cache.get('2')).toBe('2');
        expect(cache.get('3')).toBe(undefined);
        expect(cache.get('4')).toBe(undefined);
        expect(cache.get('5')).toBe('5');
        expect(cache.get('6')).toBe('6');
    });

    it('get after cache expire', () => {
        const cache = new Cache(5);
        cache.set('1', '1');
        cache.set('2', '2');
        cache.set('3', '3', -1);
        cache.set('4', '4', 20);
        cache.set('5', '5');

        expect(cache.get('1')).toBe('1');
        expect(cache.get('2')).toBe('2');
        expect(cache.get('3')).toBe(undefined);
        expect(cache.get('4')).toBe('4');
        expect(cache.get('5')).toBe('5');
    });
});
