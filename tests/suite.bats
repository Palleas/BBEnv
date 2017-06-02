#!/usr/bin/env bats

@test "running without a file" {
    run flow-node src/run.js
    [ "$status" -eq 2 ]
    [ "$output" = "usage: bbenv steps..." ]
}

@test "running with a file that do not start with buddybuild_" {
    skip
    run flow-node src/run.js not_a_custom_step.sh
    [ "$status" -eq 2 ]
    [ "$output" = "fatal: script 'not_a_custom_step.sh' is not a custom build step" ]
}
