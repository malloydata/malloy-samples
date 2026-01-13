/*
 * Copyright 2023 Google LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import fs from 'fs';
import path from 'path';
import { DuckDBConnection } from '@malloydata/db-duckdb';
import { compileMSQL } from './utils/msql';
import { compileMalloy } from './utils/malloy';

const SAMPLE_PROJECT_ROOT = path.join(__dirname, '..');
const EXCEPT_LIST = [
  'apijson.malloynb',
  'build_titles.malloysql',
  'node_modules',
  'tmp',
];

describe('DuckDB', () => {
  let modelsFound = false;
  for (const dir of fs.readdirSync(SAMPLE_PROJECT_ROOT)) {
    if (EXCEPT_LIST.includes(dir)) continue;
    const projectPath = path.join(SAMPLE_PROJECT_ROOT, dir);
    // ignore non-directory or non-duckdb directories
    if (!fs.statSync(projectPath).isDirectory() || dir.startsWith('bigquery')) continue;
    for (const fn of fs.readdirSync(projectPath)) {
      if (EXCEPT_LIST.includes(fn)) {
        // ignore it
      } else if (fn.endsWith('.malloy')) {
        modelsFound = true;
        const filePath = path.join(projectPath, fn);
        it(`compiles ${dir}/${fn}`, async () => {
          await compileMalloy(
            filePath,
            new DuckDBConnection('duckdb', ':memory:', projectPath)
          );
        });
      } else if (fn.endsWith('.malloynb') || fn.endsWith('.malloysql')) {
        modelsFound = true;
        const filePath = path.join(projectPath, fn);
        it(`compiles ${dir}/${fn}`, async () => {
          await compileMSQL(
            filePath,
            new DuckDBConnection('duckdb', ':memory:', projectPath)
          );
        });
      }
    }
  }
  expect(modelsFound).toBeTruthy();
});
