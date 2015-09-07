function functionalStateMachine(options) {
  var states = options.states;
  var currentState = options.initial;
  var toApply = options.apply;

  if (!states[currentState]) {
    throw new Error(currentState + ' is an invalid state');
  }

  for (var i = 0; i < toApply.length; i++) {
    currentState = states[currentState][toApply[i]];
    if (!states[currentState]) {
      throw new Error(currentState + ' is an invalid state');
    }
  }

  return currentState;
}

if (typeof module !== 'undefined') {
  module.exports = functionalStateMachine;
}
