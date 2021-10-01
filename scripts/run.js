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

// eslint-disable-next-line max-statements
const run = async (scenario) => {
  if (!scenario) {
    throw new Error("Must provide a scenario");
  }

  const scenarioDir = path.resolve(__dirname, `../scenarios/${scenario}`);
  await fs.access(scenarioDir).catch(() => {
    throw new Error(`Could not read ${scenarioDir}`);
  });

  const descPath = path.resolve(__dirname, `../scenarios/${scenario}/README.md`);
  const desc = (await fs.readFile(descPath)).toString();

  log(chalk `\n{cyan ## {underline.bold ${scenario}}}`);
  log(chalk `{italic.gray ${desc.trim()}}`);

  for (const { node, nodeRaw, mode, modeRaw } of MATRIX) {
    const nodePath = path.resolve(HOME, `.nvm/versions/node/v${nodeRaw}/bin/node`);
    const indexPath = path.resolve(scenarioDir, MODES[modeRaw]);

    // Exec and capture errors.
    let msg;
    let errMsg;
    try {
      const { stdout, stderr } = await execa(nodePath, [indexPath]);
      if (stderr) {
        errMsg = stderr;
      } else {
        msg = stdout.trim();
      }
    } catch (err) {
      // Find likely actual error message.
      errMsg = err.stderr.split("\n").find((line) => (/^[a-zA-Z]+:.*/).test(line)) || err.stderr;
    }

    // Chalk-enhance messages with `-`
    if (errMsg) {
      errMsg = errMsg
        .replace(/\(node:[0-9]+\) /, "")
        .split("\n")[0];
      msg = chalk `{underline.red error} - {gray ${errMsg}}`;
    } else if (msg) {
      const [file, ...rest] = msg.split(" - ");
      if (file) {
        msg = chalk `{underline.cyan ${file}}${rest.length ? [""].concat(rest).join(" - ") : ""}`;
      }
    }

    log(chalk `{gray [${node}] [${mode}]} ${msg}`);
  }
};

// Run all scenarios.
const runAll = async () => {
  const scenarios = await fs.readdir(path.resolve(__dirname, "../scenarios"));
  // Iterate scenarios in **serial** for readability.
  for (const scenario of scenarios) {
    await run(scenario);
  }
};

// Script
if (require.main === module) {
  const scenario = process.argv[2]; // eslint-disable-line no-magic-numbers
  const runner = scenario ? run : runAll;
  runner(scenario).catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}

module.exports = {
  run
};
