# BBEnv

[![npm version](https://badge.fury.io/js/bbenv.svg)](https://badge.fury.io/js/bbenv)

[![Build Status](https://travis-ci.org/Palleas/BBEnv.svg?branch=master)](https://travis-ci.org/Palleas/BBEnv)

Making running [Buddybuild custom build steps](http://docs.buddybuild.com/docs/custom-prebuild-and-postbuild-steps) locally easier.

## Context

Buddybuild is a smart service that does a lot for you. That said, there are some situation where you want to [customize the build process](https://www.buddybuild.com/blog/customizing-the-build-process). Using [custom build steps](docs.buddybuild.com/docs/custom-prebuild-and-postbuild-steps), you can execute shell scripts after cloning, before and after the build... Here is an example from our blog post about this:

```shell
#!/usr/bin/env bash
# Adding the buddybuild branch to a PList
/usr/libexec/PlistBuddy -c "Add APP_BRANCH String $BUDDYBUILD_BRANCH" "Info.plist"
```

If you want to try this script locally before pushing it, you will need to define the `BUDDYBUILD_BRANCH` environment variable. This is tedious and there are quite a lot of environment variable you may need. I made this tool to let you run your custom builds steps in a close-to-production environment by exposing **relevant** environmment variables.

## List of environment variables

| Environment variable          | Comment                                                             |
| ----------------------------- | ------------------------------------------------------------------- |
| BUDDYBUILD_BUILD_NUMBER       | Takes the latest build number and adds 1.                           |
| BUDDYBUILD_BUILD_ID           | Generates a random UUID.                                            |
| BUDDYBUILD_BRANCH             | Takes the branch you're currently on.                               |
| BUDDYBUILD_WORKSPACE          | Takes the folder you're currently on.                               |
| BUDDYBUILD_TRIGGERED_BY       | Always "ui_triggered" for now.                                      |
| BUDDYBUILD_IPA_PATH           | Download the IPA from the latest succesful build and use this path. |
| BUDDYBUILD_APP_STORE_IPA_PATH | Download the IPA from the latest succesful build and use this path. |
| BUDDYBUILD_BASE_BRANCH        | Not supported yet, always empty.                                    |
| BUDDYBUILD_PULL_REQUEST       | Not supported yet, always empty.                                    |
| BUDDYBUILD_APP_ID             | Not supported yet, always empty.                                    |
| BUDDYBUILD_REPO_SLUG          | Not supported yet, always empty.                                    |
| BUDDYBUILD_SECURE_FILES       | Not supported yet, always empty.                                    |
| BUDDYBUILD_SCHEME             | Not supported yet, always empty.                                    |
| BUDDYBUILD_TEST_DIR           | Not supported yet, always empty.                                    |
| BUDDYBUILD_VARIANTS           | Not supported yet, always empty.                                    |
| ANDROID_HOME                  | Not supported yet, always empty.                                    |
| ANDROID_NDK_HOME              | Not supported yet, always empty.                                    |

## Why

50% because it's fun, 50% because I wanted to show the stuff you can do using our [public API](http://docs.buddybuild.com/docs/api-developer-guide).

## Installation

`yarn global add bbenv` (or `npm install -g bbenv` I guess)

## Usage

```shell
bbenv buddybuild_postclone.js
```

## Contributing to bbenv

1. Clone the repo
2. run `make bootstrap`

Run tests with [bats](https://github.com/sstephenson/bats) using `make test`

## License

MIT. See bundled [LICENSE](LICENSE) file.
