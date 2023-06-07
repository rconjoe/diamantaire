const path = require('path');
module.exports = {
  '*.{js,jsx,ts,tsx,md,html,css}': (allFiles) => {
    const cwd = process.cwd();
    const relativePaths = allFiles.map((file) => path.relative(cwd, file));
    return ['nx format:write --uncommitted', `nx affected:lint --files="${relativePaths}"`];
  },
};
