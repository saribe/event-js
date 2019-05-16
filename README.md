# listenerjs 
 [![Beerpay](https://beerpay.io/saribe/listenerjs/badge.svg?style=beer)](https://beerpay.io/saribe/listenerjs) [![Build Status](https://badgen.net/circleci/github/saribe/listenerjs)](https://circleci.com/gh/saribe/listenerjs) 
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

function fakeEvent1(event) {
    setTimeout(() => event.dispatch("5000 after"), 5000);
    setTimeout(() => event.dispatch("10000 after"), 10000);
}

export default = {
    onSomeEvent: (callback) {
        fakeEvent1(event1);
        return event1.addListener(callback);
    },
    onceSomeEvent: (callback) {
        fakeEvent1(event1);
        return event1.once(callback);
    },
    onSomeOtherEvent: event2.addListener
    ...,
}

// Usage
import { onSomeEvent, onceSomeEvent, onSomeOtherEvent } from 'someModule';

// Will log "5000 after" and "10000 after"
onSomeEvent(payload => console.log(payload)));

// Will log "5000 after" only
onceSomeEvent(payload => console.log(payload)));

// There is no specification for the dispatch of this event...
const subscription = onSomeOtherEvent(payload => console.log(payload)));

// remove subscription
subscription2.remove();
```

## API

When created an event, it will expose:

 Property     | Type     | Parameters          | Returns      |
| ---------   | -------- |-------------------- | ------------ |
| addListener | function | function[, context] | { remove }   |
| dispatch    | function | any                 | null         |
| once        | function | function[, context] | { remove }   |

## License

[MIT](http://opensource.org/licenses/MIT)

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/saribe/listenerjs/badge.svg?style=beer-square)](https://beerpay.io/saribe/listenerjs)  [![Beerpay](https://beerpay.io/saribe/listenerjs/make-wish.svg?style=flat-square)](https://beerpay.io/saribe/listenerjs?focus=wish)