const getOwn = (obj, key) => (Object.hasOwn(obj, key) ? obj[key] : undefined);

const assertValidState = (states, state) => {
  if (getOwn(states, state) === undefined) {
    throw new Error(`${state} is an invalid state`);
  }
};

export function functionalStateMachine({ states, initial, apply }) {
  assertValidState(states, initial);
  return apply.reduce((currentState, action) => {
    const transitions = getOwn(states, currentState);
    const nextState = getOwn(transitions, action);
    assertValidState(states, nextState);
    return nextState;
  }, initial);
}
