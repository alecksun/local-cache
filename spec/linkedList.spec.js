'use strict';

const LinkedList = require('../lib/linkedList');

describe('LinkedList', () => {
    it('insert value from head', () => {
        const list = new LinkedList();

        list.unshift(1);
        list.unshift(2);
        list.unshift(3);

        expect(list.head.value).toBe(3);
        expect(list.head.next.value).toBe(2);
        expect(list.head.next.next.value).toBe(1);
        expect(list.head.next.next.next).toBe(null);

        expect(list.tail.value).toBe(1);
        expect(list.tail.prev.value).toBe(2);
        expect(list.tail.prev.prev.value).toBe(3);
        expect(list.tail.prev.prev.prev).toBe(null);
    });

    it('insert value from tail', () => {
        const list = new LinkedList();

        list.push(1);
        list.push(2);
        list.push(3);

        expect(list.head.value).toBe(1);
        expect(list.head.next.value).toBe(2);
        expect(list.head.next.next.value).toBe(3);
        expect(list.head.next.next.next).toBe(null);

        expect(list.tail.value).toBe(3);
        expect(list.tail.prev.value).toBe(2);
        expect(list.tail.prev.prev.value).toBe(1);
        expect(list.tail.prev.prev.prev).toBe(null);
    });
});
