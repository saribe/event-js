export function createEvent() {
    let subscribers = [];

    return {
        addListener,
        dispatch,
        once,
    };

    function once(callback, context) {
        return addListener(fn, context);

        function fn(...args) {
            callback.apply(context, args);
            unsubscribe(fn, context);
        }
    }

    function addListener(callback, context) {
        subscribers.push({ callback, context });

        return {
            remove: unsubscribe.bind(null, callback, context),
        };
    }

    function dispatch(...args) {
        subscribers.forEach(({ callback, context }) => callback.apply(context, args));
    }

    function unsubscribe(cb, cx) {
        subscribers = subscribers
            .filter(({ callback, context }) => callback !== cb || context !== cx);
    }
}
