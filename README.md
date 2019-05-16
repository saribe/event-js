# listenerjs 
[![Build Status](https://badgen.net/circleci/github/saribe/listenerjs)](https://circleci.com/gh/saribe/listenerjs) 
[![npm package](https://badgen.net/npm/v/listenerjs)](https://www.npmjs.com/package/listenerjs) 
[![coverage](https://badgen.net/codecov/c/github/saribe/listenerjs)](https://codecov.io/gh/saribe/listenerjs) 

> Event subscription made simple for JavaScript

Demo ...

## Installation

```sh
npm install -D listenerjs
```

## Usage

```js
// someModule module definition
import { createEvent } from 'listenerjs';
const event1 = createEvent();
const event2 = createEvent();

export default = {
    onSomeEvent: (callback) {
        setTimeout(() => {
            // Will dispatch the event with a string as first argument
            event1.dispatch("Some event was dispatched");
        }, 5000)

        return event1.addListener(callback);
    },
    onSomeOtherEvent: event2.addListener
    ...,
}

// Usage
import someModule from 'somewhere';

const onSomething = payload => console.log(payload));

// onSomething will be executed 5000ms after
const subscription1 = someModule.onSomeEvent(onSomething);
// there is no specification for the dispatch of this event...
const subscription2 = someModule.onSomeOtherEvent(onSomething);

// remove subscription
subscription2.remove();
```

## API

## Related

## License

[MIT](http://opensource.org/licenses/MIT)
