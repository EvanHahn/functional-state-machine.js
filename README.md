functional finite state machine for the javascript
==================================================

If I'm hungry and I eat a salad, I get full. If I eat a burrito, I get _too_ full. As time passes, I get hungrier and hungrier.

We can model this with a state diagram if we are huge nerds:

![a state diagram](https://cloud.githubusercontent.com/assets/777712/9709001/c3a6b256-54d8-11e5-92e6-833c8810cba5.png)

We can then model this in JavaScript:

```javascript
var myStates = {
  hungry: {
    eatSalad: 'full',
    eatBurrito: 'tooFull',
    timePasses: 'hungry'
  },
  full: {
    timePasses: 'hungry'
  },
  tooFull: {
    timePasses: 'full'
  }
}
```

Now we can transition between them!

```javascript
// returns "hungry"
functionalStateMachine({
  states: myStates,
  initial: 'full',
  apply: ['timePasses']
})

// returns "hungry"
functionalStateMachine({
  states: myStates,
  initial: 'full',
  apply: ['timePasses', 'timePasses']
})

// returns "tooFull"
functionalStateMachine({
  states: myStates,
  initial: 'hungry',
  apply: ['eatBurrito']
})

// returns "full"
functionalStateMachine({
  states: myStates,
  initial: 'hungry',
  apply: ['eatBurrito', 'timePasses']
})
```

To use this with Node, Browserify, or Webpack:

```javascript
var functionalStateMachine = require('@evanhahn/functional-state-machine');

functionalStateMachine({
  states: myStates,
  initial: 'full',
  apply: ['timePasses']
})
```

To use in the browser:

```html
<script src="functionalstatemachine.js"></script>
<script>
functionalStateMachine({
  states: myStates,
  initial: 'hungry',
  apply: ['eatBurrito']
})
</script>
```

Enjoy!
