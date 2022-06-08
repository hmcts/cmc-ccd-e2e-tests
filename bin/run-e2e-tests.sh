#!/bin/bash
set -ex

export TESTS_FOR_ACCESSIBILITY='true'
export E2E_OUTPUT_DIR='./functional-output/'

if [[ "$RUN_FULL_REGRESSION_SUITE" == "YES" ]]
then
    export E2E_TEST_PATH='./paths/**/*.js'
fi
yarn test:functional

