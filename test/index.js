var machine = require('..');

var expect = require('expect.js');

describe('functional state machine', function () {
  beforeEach(function () {
    this.states = {
      a: {
        goToB: 'b',
        circleBack: 'a'
      },
      b: {
        goToA: 'a',
        goToC: 'c'
      },
      c: {
        goToA: 'a',
        goToTheEther: 'nowhere'
      }
    };
  });

  it('can do no transition', function () {
    expect(machine({
      states: this.states,
      initial: 'a',
      apply: []
    })).to.equal('a');

    expect(machine({
      states: this.states,
      initial: 'b',
      apply: []
    })).to.equal('b');

    expect(machine({
      states: this.states,
      initial: 'c',
      apply: []
    })).to.equal('c');
  });

  it('transitions from a to a', function () {
    expect(machine({
      states: this.states,
      initial: 'a',
      apply: ['circleBack']
    })).to.equal('a');
  });

  it('transitions from a to b', function () {
    expect(machine({
      states: this.states,
      initial: 'a',
      apply: ['goToB']
    })).to.equal('b');
  });

  it('transitions from a to b and back', function () {
    expect(machine({
      states: this.states,
      initial: 'a',
      apply: ['goToB', 'goToA']
    })).to.equal('a');
  });

  it('transitions from a to b to c to a', function () {
    expect(machine({
      states: this.states,
      initial: 'a',
      apply: ['goToB', 'goToC', 'goToA']
    })).to.equal('a');
  });

  it('errors out with a bad initial state', function () {
    expect(function () {
      machine({
        states: this.states,
        initial: 'foo',
        apply: []
      });
    }.bind(this)).to.throwException('foo is an invalid state');
  });

  it('errors out when transitioning to a bad state', function () {
    expect(function () {
      machine({
        states: this.states,
        initial: 'b',
        apply: ['goToC', 'goToTheEther', 'goToA']
      });
    }.bind(this)).to.throwException('nowhere is an invalid state');
  });
});
