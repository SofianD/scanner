// Import Node.js Dependencies
import path from "path";

// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import { filterDependencyKind } from "../../src/utils/index.js";

test("filterDependencyKind should be able to split files and packages", (tape) => {
  const result = filterDependencyKind(["mocha", "."], process.cwd());
  tape.deepEqual(result.files, ["index.js"]);
  tape.deepEqual(result.packages, ["mocha"]);

  tape.end();
});

test("filterDependencyKind should be able to match all relative import path", (tape) => {
  const result = filterDependencyKind([".", "./", "..", "../"], process.cwd());
  tape.deepEqual(result.files, [
    "index.js",
    "index.js",
    "..\\index.js",
    "..\\index.js"
  ]);
  tape.deepEqual(result.packages, []);

  tape.end();
});

test("filterDependencyKind should be able to match all relative import path", (tape) => {
  const result = filterDependencyKind(["./foobar.js"], process.cwd());
  tape.deepEqual(result.files, [
    path.join(process.cwd(), "foobar.js")
  ]);
  tape.deepEqual(result.packages, []);

  tape.end();
});