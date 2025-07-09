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
import { BigQueryConnection } from '@malloydata/db-bigquery';
import { compileMalloy } from './utils/malloy';
import { compileMSQL } from './utils/msql';

const SAMPLE_PROJECT_ROOT = path.join(__dirname, '..');

describe('BigQuery', () => {
  let modelsFound = false;
  for (const dir of fs.readdirSync(SAMPLE_PROJECT_ROOT)) {
    const projectPath = path.join(SAMPLE_PROJECT_ROOT, dir);
    // ignore non-directory or non-bigquery directories
    if (!fs.statSync(projectPath).isDirectory() || !dir.startsWith('bigquery')) continue;
    for (const fn of fs.readdirSync(projectPath)) {
      if (fn.endsWith('.malloy')) {
        modelsFound = true;
        const filePath = path.join(projectPath, fn);
        it(`compiles ${dir}/${fn}`, async () => {
          await compileMalloy(filePath, new BigQueryConnection('bigquery'));
        });
      } else if (fn.endsWith('.malloynb') || fn.endsWith('.malloysql')) {
        modelsFound = true;
        const filePath = path.join(projectPath, fn);
        it(`compiles ${dir}/${fn}`, async () => {
          await compileMSQL(filePath, new BigQueryConnection('bigquery'));
        });
      }
    }
  }
  expect(modelsFound).toBeTruthy();
});
