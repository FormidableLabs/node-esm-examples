Node.js ESM Examples
====================

Examples with Node.js runtimes and modern ESM support.

## Installation

The examples presently only run on a Bash-like OS / environment.

Start with yarn installation:

```sh
$ yarn install
```

Next, you will need [nvm](https://github.com/nvm-sh/nvm) and the following Node.js **exact** runtimes:

```sh
$ nvm install 10.24.1
$ nvm install 12.22.6
$ nvm install 14.17.6
```

We require the actual versions to speed up execution of known runtimes.

## Run the examples

To see available [scenarios](./scenarios):

```sh
$ yarn scenarios
different-root
...
```

To run one of the scenarios in various node versions (e.g., `10`, `12`, `14`) and modes (CommonJS `CJS`, `ESM`):

```sh
# Form
$ yarn scenario [NAME]
[VERSION] [MODE] [OUTPUT]
[VERSION] [MODE] [OUTPUT]
...

# Example
$ yarn scenario different-root

## different-root
The root exported file differs both by Node.js version _and_ mode.
[10.24.1] [CJS] main.js - from package.main on old Node.js
[14.17.6] [CJS] require.js - from package.exports root require match
[14.17.6] [ESM] import.mjs - from package.exports root import match
```

or just run `yarn scenario` to run **all** the scenarios!
