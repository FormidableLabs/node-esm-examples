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
$ nvm install 12.0.0
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

To run one of the scenarios in various node versions (e.g., `12`, `14`) and modes (CommonJS `CJS`, `ESM`):

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
[12.0.0] [CJS] main.js - from package.main on old Node.js
[14.17.6] [CJS] require.js - from package.exports root require match
[14.17.6] [ESM] import.mjs - from package.exports root import match

## dynamic-import
An ESM file is dynamically imported in both CommonJS and ESM code.
[12.0.0] [CJS] error - UnhandledPromiseRejectionWarning: Error: Not supported
[14.17.6] [CJS] import.mjs - ESM file
[14.17.6] [ESM] import.mjs - ESM file

## wrapper
A core CommonJS index file is imported and re-exported by an ESM index file.
[12.0.0] [CJS] index.cjs - core CJS code originally from index.cjs
[14.17.6] [CJS] index.cjs - core CJS code originally from index.cjs
[14.17.6] [ESM] wrapper.mjs - core CJS code originally from index.cjs
```

or just run `yarn scenario` to run **all** the scenarios!


## Maintenance Status

**Experimental:** This project is quite new. We're not sure what our ongoing maintenance plan for this project will be. Bug reports, feature requests and pull requests are welcome. If you like this project, let us know!
