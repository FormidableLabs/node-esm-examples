"use strict";

const fs = require("fs").promises;
const path = require("path");
const os = require('os');


const chalk = require("chalk");
const execa = require("execa");

const HOME = os.homedir();

const MODES = {
  CJS: "index.js",
  ESM: "index.mjs"
};

const MATRIX = [
  {
    node: "10.24.1",
    mode: "CJS"
  },
  {
    node: "14.17.6",
    mode: "CJS"
  },
  {
    node: "14.17.6",
    mode: "ESM"
  }
];

const run = async () => {
  const scenario = process.argv[2];
  if (!scenario) {
    throw new Error("Must provide a scenario");
  }

  const scenarioDir = path.resolve(__dirname, `../scenarios/${scenario}`);
  await fs.access(scenarioDir).catch(() => {
    throw new Error(`Could not read ${scenarioDir}`);
  });

  for (let { node, mode } of MATRIX) {
    const nodePath = path.resolve(HOME, `.nvm/versions/node/v${node}/bin/node`)
    const indexPath = path.resolve(scenarioDir, MODES[mode]);
    const { stdout } = await execa(nodePath, [indexPath]);
    console.log(chalk`{cyan ${node} }{green ${mode}} ${stdout.trim()}`);
  }
};

// Script
if (require.main === module) {
  run().catch((err) => {
    console.log(err);
    process.exit(1);
  });
}

module.exports = {
  run
};
