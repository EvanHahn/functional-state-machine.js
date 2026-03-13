const machine = require(".");
const assert = require("node:assert/strict");
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
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: [],
    }),
    "a",
  );

  assert.strictEqual(
    machine({
      states,
      initial: "b",
      apply: [],
    }),
    "b",
  );

  assert.strictEqual(
    machine({
      states,
      initial: "c",
      apply: [],
    }),
    "c",
  );
});

test("transitions from a to a", function () {
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: ["circleBack"],
    }),
    "a",
  );
});

test("transitions from a to b", function () {
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: ["goToB"],
    }),
    "b",
  );
});

test("transitions from a to b and back", function () {
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: ["goToB", "goToA"],
    }),
    "a",
  );
});

test("transitions from a to b to c to a", function () {
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: ["goToB", "goToC", "goToA"],
    }),
    "a",
  );
});

test("errors out with a bad initial state", function () {
  assert.throws(
    function () {
      machine({
        states,
        initial: "foo",
        apply: [],
      });
    }.bind(this),
    { message: "foo is an invalid state" },
  );
});

test("errors out when transitioning to a bad state", function () {
  assert.throws(
    function () {
      machine({
        states,
        initial: "b",
        apply: ["goToC", "goToTheEther", "goToA"],
      });
    }.bind(this),
    { message: "nowhere is an invalid state" },
  );
});
