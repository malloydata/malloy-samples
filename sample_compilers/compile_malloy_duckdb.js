/**
 * compile_duckdb.js
 *
 * Usage:
 *   node compile_duckdb.js <path-to-malloy-file>
 *
 * Arguments:
 *   <path-to-malloy-file>   Path to a .malloy model file to compile.
 *
 * Example:
 *   node compile_duckdb.js ../models/shapes.malloy
 *
 * This script will compile the given Malloy model using a DuckDB connection.
 */
/* eslint-disable no-console, no-process-exit */

const fs = require('fs').promises;
const path = require('path');

const {SingleConnectionRuntime} = require('@malloydata/malloy');
const {DuckDBConnection} = require('@malloydata/db-duckdb');

async function setupDuckDb(workingDirectory) {
  // Initialize DuckDB WASM connection
  const duckdbConnection = new DuckDBConnection({
    workingDirectory,
  });
  await duckdbConnection.init();
  return duckdbConnection;
}

// Compile a Malloy model from text
async function compileMalloyModel(connection, malloyModelText) {
  const runtime = new SingleConnectionRuntime({connection});
  // Try to compile the model
  try {
    const model = await runtime.loadModel(malloyModelText);
    const materializedModel = await model.getModel();
    return {
      ok: true,
      data: materializedModel,
    };
  } catch (e) {
    return {
      ok: false,
      errors: e.problems,
    };
  }
}

async function run() {
  const filePath = process.argv[2];
  if (!filePath) {
    return {
      ok: false,
      errors: [
        'No Malloy file path provided.\n\nUsage: node compile_duckdb.js <path-to-malloy-file>',
      ],
    };
  }
  try {
    const absolutePath = path.resolve(filePath);
    const malloyModelText = await fs.readFile(absolutePath, 'utf8');
    // Provide the working directory of the model so Malloy will resolve data files
    // relative to the model and not to this script.
    const workingDirectory = path.dirname(absolutePath);
    const duckDbConnection = await setupDuckDb(workingDirectory);
    const result = await compileMalloyModel(duckDbConnection, malloyModelText);
    return result;
  } catch (err) {
    return {
      ok: false,
      errors: [err.message],
    };
  }
}

run().then(result => {
  if (!result.ok) {
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  } else {
    console.log({...result, message: 'Malloy model compiled successfully.'});
  }
});
