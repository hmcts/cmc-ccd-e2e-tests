'use strict';

const requireDirectory = require('require-directory');
const steps = requireDirectory(module);

module.exports = function () {
    return actor({
        authenticateWithIdamIfAvailable: steps.IDAM.signIn,
    });
}