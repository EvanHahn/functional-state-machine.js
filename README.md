functional finite state machine for the javascript
==================================================

I've got some states:

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

Enjoy!
