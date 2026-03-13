import assert from "node:assert/strict";
import test from "node:test";
import { functionalStateMachine as machine } from "./functionalstatemachine.js";

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

test("can do no transition", () => {
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

test("transitions from a to a", () => {
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: ["circleBack"],
    }),
    "a",
  );
});

test("transitions from a to b", () => {
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: ["goToB"],
    }),
    "b",
  );
});

test("transitions from a to b and back", () => {
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: ["goToB", "goToA"],
    }),
    "a",
  );
});

test("transitions from a to b to c to a", () => {
  assert.strictEqual(
    machine({
      states,
      initial: "a",
      apply: ["goToB", "goToC", "goToA"],
    }),
    "a",
  );
});

test("errors out with a bad initial state", () => {
  assert.throws(
    () => {
      machine({
        states,
        initial: "foo",
        apply: [],
      });
    },
    { message: "foo is an invalid state" },
  );
});

test("errors out when transitioning to a bad state", () => {
  assert.throws(
    () => {
      machine({
        states,
        initial: "b",
        apply: ["goToC", "goToTheEther", "goToA"],
      });
    },
    { message: "nowhere is an invalid state" },
  );
});
