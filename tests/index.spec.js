import { createEvent } from '../src';

describe('Event call', () => {
    it('Arguments are bubbled to subscribers', () => {
        const event = createEvent();
        const mockCallback = jest.fn((x) => x);

        event.addListener(mockCallback);
        event.dispatch(2, 3, 4);

        expect(mockCallback.mock.calls[0][0]).toBe(2);
        expect(mockCallback.mock.calls[0][1]).toBe(3);
        expect(mockCallback.mock.calls[0][2]).toBe(4);
    });

    it('Add 1 subscription and trigger once', () => {
        const event = createEvent();
        const mockCallback = jest.fn();

        event.addListener(mockCallback);
        event.dispatch();

        expect(mockCallback.mock.calls.length).toBe(1);
    });

    it('Add 1 subscription and trigger twice', () => {
        const event = createEvent();
        const mockCallback = jest.fn();

        event.addListener(mockCallback);
        event.dispatch(2);
        event.dispatch(2);

        expect(mockCallback.mock.calls.length).toBe(2);
    });

    it('Add 2 subscription and trigger once', () => {
        const event = createEvent();
        const mockCallback = jest.fn();

        event.addListener(mockCallback);
        event.addListener(mockCallback);
        event.dispatch();

        expect(mockCallback.mock.calls.length).toBe(2);
    });

    it('Dispatch without subscription', () => {
        const event = createEvent();
        const mockCallback = jest.fn();

        event.dispatch();

        expect(mockCallback.mock.calls.length).toBe(0);
    });

    it('Add one subscription and never dispatch', () => {
        const event = createEvent();
        const mockCallback = jest.fn();

        event.addListener(mockCallback);

        expect(mockCallback.mock.calls.length).toBe(0);
    });

    it('Remove subscription', () => {
        const event = createEvent();
        const mockCallback = jest.fn();

        const subscription1 = event.addListener(mockCallback);
        subscription1.remove();
        event.dispatch();

        expect(mockCallback.mock.calls.length).toBe(0);
    });

    it('Create 2 events and run "1 dispatch" and "2 dispatch"', () => {
        const event1 = createEvent();
        const event2 = createEvent();
        const mockCallback1 = jest.fn();
        const mockCallback2 = jest.fn();

        event1.addListener(mockCallback1);
        event2.addListener(mockCallback2);

        event1.dispatch();
        event2.dispatch();
        event2.dispatch();

        expect(mockCallback1.mock.calls.length).toBe(1);
        expect(mockCallback2.mock.calls.length).toBe(2);
    });

    it('Auto remove on dispatch', () => {
        const event = createEvent();
        const mockCallback = jest.fn(() => {
            subscription1.remove();
        });

        const subscription1 = event.addListener(mockCallback);
        event.dispatch();
        event.dispatch();

        expect(mockCallback.mock.calls.length).toBe(1);
    });

    it('Add 1 event, 2 subscriptions with same function, different contexts', () => {
        const event = createEvent();
        const mockCallback1 = jest.fn();
        const context1 = {};
        const context2 = {};

        event.addListener(mockCallback1, context1);
        event.addListener(mockCallback1, context2);

        event.dispatch();

        expect(mockCallback1.mock.calls.length).toBe(2);
    });

    it('Add 1 event, 3 subscriptions with same function, different contexts. Remove one Subscription.', () => {
        const event = createEvent();
        const mockCallback1 = jest.fn();
        const context1 = {};
        const context2 = {};

        const subscription = event.addListener(mockCallback1, context1);
        event.addListener(mockCallback1);
        event.addListener(mockCallback1, context2);

        subscription.remove();
        event.dispatch();

        expect(mockCallback1.mock.calls.length).toBe(2);
    });

    it('Disposable subscription', () => {
        const event = createEvent();
        const mockCallback = jest.fn();

        event.once(mockCallback);
        event.dispatch();
        event.dispatch();

        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
