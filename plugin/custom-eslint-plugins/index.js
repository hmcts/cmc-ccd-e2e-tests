'use strict';
const no_duplicate_class_names_1 = require('./no-duplicate-class-names');
const plugins = {
  rules: {
    'no-duplicate-class-names': no_duplicate_class_names_1.noDuplicateClassNames,
  },
};
module.exports = plugins;
