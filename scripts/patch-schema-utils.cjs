// scripts/patch-schema-utils.cjs
// Makes schema-utils v4 compatible with old callers that expect:
//   - require('schema-utils') as a function (v1 API)
//   - require('schema-utils').validateOptions (alias)
// We wrap module.exports into a callable function that forwards to `validate`,
// and we add `validateOptions` as an alias.

const fs = require("fs");
const path = require("path");

try {
  const entryPath = require.resolve("schema-utils"); // CJS entry
  const dir = path.dirname(entryPath);
  const indexPath = path.join(dir, "index.js");

  let src = fs.readFileSync(indexPath, "utf8");

  // Only apply once
  if (!src.includes("/* [voitho-patch] schema-utils v1 compat */")) {
    const patch = `
/* [voitho-patch] schema-utils v1 compat */
(function () {
  try {
    var api = module.exports || exports;
    // If it's already a function, nothing to do
    if (typeof api === 'function') return;

    // If api.validate exists (schema-utils v3/v4), wrap into callable function
    if (api && typeof api.validate === 'function') {
      var wrapped = function validateOptionsShim(schema, options, config) {
        return api.validate(schema, options, config);
      };
      // copy enumerable props
      Object.keys(api).forEach(function (k) { wrapped[k] = api[k]; });

      // back-compat aliases
      if (typeof wrapped.validateOptions !== 'function') {
        wrapped.validateOptions = wrapped.validate;
      }

      // replace exports with callable shim
      module.exports = wrapped;
    } else {
      // As a last resort, make validateOptions a no-op to avoid crashing
      var minimal = function () { return true; };
      minimal.validate = minimal;
      minimal.validateOptions = minimal;
      module.exports = minimal;
    }
  } catch (e) {
    // ignore
  }
})();`;

    // Append the patch
    fs.writeFileSync(indexPath, src + "\n" + patch, "utf8");
    console.log("[patch] schema-utils: applied v1-compat callable shim");
  } else {
    console.log("[patch] schema-utils: shim already present (skipped)");
  }
} catch (e) {
  console.log("[patch] schema-utils: could not apply shim:", e && e.message);
}
