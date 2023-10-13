#!/usr/bin/env bash

set -euo pipefail

. prelude

alert "Let's walk through some tests."
alert "This is the alert() fn working."

os_detection
input_prompt
password_prompt
yn_prompt
menu

alert "Everything looks good. Finally we will execute a test of the fail trap. Press enter to continue."

fail "This is a fake error. Everything works."

