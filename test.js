const machine = require(".");
const expect = require("expect.js");
const test = require("node:test");

const states = {
  a: {
    goToB: "b",
    circleBack: "a",
  },
  b: {
    goToA: "a",
    goToC: "c",
  },
  c: {
    goToA: "a",
    goToTheEther: "nowhere",
  },
};

test("can do no transition", function () {
  expect(
    machine({
      states,
      initial: "a",
      apply: [],
    }),
  ).to.equal("a");

  expect(
    machine({
      states,
      initial: "b",
      apply: [],
    }),
  ).to.equal("b");

  expect(
    machine({
      states,
      initial: "c",
      apply: [],
    }),
  ).to.equal("c");
});

test("transitions from a to a", function () {
  expect(
    machine({
      states,
      initial: "a",
      apply: ["circleBack"],
    }),
  ).to.equal("a");
});

test("transitions from a to b", function () {
  expect(
    machine({
      states,
      initial: "a",
      apply: ["goToB"],
    }),
  ).to.equal("b");
});

test("transitions from a to b and back", function () {
  expect(
    machine({
      states,
      initial: "a",
      apply: ["goToB", "goToA"],
    }),
  ).to.equal("a");
});

test("transitions from a to b to c to a", function () {
  expect(
    machine({
      states,
      initial: "a",
      apply: ["goToB", "goToC", "goToA"],
    }),
  ).to.equal("a");
});

test("errors out with a bad initial state", function () {
  expect(
    function () {
      machine({
        states,
        initial: "foo",
        apply: [],
      });
    }.bind(this),
  ).to.throwException("foo is an invalid state");
});

test("errors out when transitioning to a bad state", function () {
  expect(
    function () {
      machine({
        states,
        initial: "b",
        apply: ["goToC", "goToTheEther", "goToA"],
      });
    }.bind(this),
  ).to.throwException("nowhere is an invalid state");
});
