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

To see available scenarios:

```sh
$ yarn scenarios
different-index
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
$ yarn scenario different-index
10.24.1 CJS main.js
14.17.6 CJS require.js
14.17.6 ESM import.mjs
```
