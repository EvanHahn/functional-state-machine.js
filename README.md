# functional finite state machine for the javascript

If I'm hungry and I eat a salad, I get full. If I eat a burrito, I get _too_ full. As time passes, I get hungrier and hungrier.

We can model this in JavaScript:

```javascript
const myStates = {
  hungry: {
    eatSalad: "full",
    eatBurrito: "tooFull",
    timePasses: "hungry",
  },
  full: {
    timePasses: "hungry",
  },
  tooFull: {
    timePasses: "full",
  },
};
```

Now we can transition between them:

```javascript
import { functionalStateMachine } from "@evanhahn/functional-state-machine";

// returns "hungry"
functionalStateMachine({
  states: myStates,
  initial: "full",
  apply: ["timePasses"],
});

// returns "hungry"
functionalStateMachine({
  states: myStates,
  initial: "full",
  apply: ["timePasses", "timePasses"],
});

// returns "tooFull"
functionalStateMachine({
  states: myStates,
  initial: "hungry",
  apply: ["eatBurrito"],
});

// returns "full"
functionalStateMachine({
  states: myStates,
  initial: "hungry",
  apply: ["eatBurrito", "timePasses"],
});
```
