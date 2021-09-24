"use strict";

const fs = require("fs").promises;
const path = require("path");
const os = require("os");


const chalk = require("chalk");
const strip = require("strip-ansi");
const execa = require("execa");
const { log } = console;

const HOME = os.homedir();

const MODES = {
  CJS: "index.js",
  ESM: "index.mjs"
};

const MATRIX = [
  {
    node: chalk.red("10.24.1"),
    mode: chalk.magenta("CJS")
  },
  {
    node: chalk.yellow("14.17.6"),
    mode: chalk.magenta("CJS")
  },
  {
    node: chalk.yellow("14.17.6"),
    mode: chalk.green("ESM")
  }
];

// Provide raw string versions
MATRIX.forEach((el) => {
  el.nodeRaw = strip(el.node);
  el.modeRaw = strip(el.mode);
});

const run = async () => {
  const scenario = process.argv[2]; // eslint-disable-line no-magic-numbers
  if (!scenario) {
    throw new Error("Must provide a scenario");
  }

  const scenarioDir = path.resolve(__dirname, `../scenarios/${scenario}`);
  await fs.access(scenarioDir).catch(() => {
    throw new Error(`Could not read ${scenarioDir}`);
  });

  for (const { node, nodeRaw, mode, modeRaw } of MATRIX) {
    const nodePath = path.resolve(HOME, `.nvm/versions/node/v${nodeRaw}/bin/node`);
    const indexPath = path.resolve(scenarioDir, MODES[modeRaw]);
    const { stdout } = await execa(nodePath, [indexPath]);

    // Chalk-enhance messages with `-`
    let msg = stdout.trim();
    const [file, ...rest] = msg.split(" - ");
    if (file) {
      msg = chalk `{cyan ${file}}${rest.length ? [""].concat(rest).join(" - ") : ""}`;
    }

    log(chalk `{gray [${node}] [${mode}]} ${msg}`);
  }
};

// Script
if (require.main === module) {
  run().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}

module.exports = {
  run
};
