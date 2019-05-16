export function createEvent () {
    let subscribers = [];

    return {
        addListener,
        dispatch,
    };

    function addListener (callback, context) {
        subscribers.push({ callback, context });

        return {
            remove: unsubscribe.bind(null, callback, context),
        };
    }

    function dispatch (...args) {
        subscribers.forEach(({ callback, context }) => callback.apply(context, args));
    }

    function unsubscribe (cb, cx) {
        subscribers = subscribers
            .filter(({ callback, context }) => callback !== cb || context !== cx);
    }
}
