// .lintstagedrc.js
module.exports = {
    // If any ts/js(x) files changed.
    '{packages,tools}/**/*.{ts,js,json,md,html,graphql,css,scss}': [
      // Execute tests related to the staged files.
      'nx affected --target lint --uncommitted --fix true',
      'nx affected --target test --uncommitted --fix',
      'nx format:write --uncommitted',
  
      // Run the typechecker.
      // Anonymous function means: "Do not pass args to the command."
      () => 'tsc --noEmit',
    ],
  };