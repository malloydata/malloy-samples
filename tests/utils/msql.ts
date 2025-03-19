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

import {fileURLToPath, pathToFileURL} from 'url';
import * as fs from 'fs';
import type {MalloySQLSQLStatement} from '@malloydata/malloy-sql';
import {MalloySQLParser, MalloySQLStatementType} from '@malloydata/malloy-sql';
import type {Connection, LogMessage} from '@malloydata/malloy';
import {MalloyError, Runtime} from '@malloydata/malloy';
import type {EmbeddedMalloyQuery} from '@malloydata/malloy-sql/dist/types';

const fixLogRange = (
  uri: string,
  malloyQuery: EmbeddedMalloyQuery,
  log: LogMessage,
  adjustment = 0
): string => {
  if (log.at) {
    if (log.at.url === 'internal://internal.malloy') {
      log.at.url = uri;
    } else if (log.at.url !== uri) {
      return '';
    }

    const embeddedStart: number = log.at.range.start.line + adjustment;
    // if the embedded malloy is on the same line as SQL, pad character start (and maybe end)
    if (embeddedStart === 0) {
      log.at.range.start.character += malloyQuery.malloyRange.start.character;
      if (log.at.range.start.line === log.at.range.end.line)
        log.at.range.end.character += malloyQuery.malloyRange.start.character;
    }

    const lineDifference = log.at.range.end.line - log.at.range.start.line;
    log.at.range.start.line = malloyQuery.range.start.line + embeddedStart;
    log.at.range.end.line =
      malloyQuery.range.start.line + embeddedStart + lineDifference;

    return `\n${log.message} at line ${log.at?.range.start.line}`;
  }
  return '';
};

export const compileMSQL = async (path: string, connection: Connection) => {
  const url = pathToFileURL(path);

  const document = fs.readFileSync(path, 'utf-8');
  const parse = MalloySQLParser.parse(document, url.toString());
  let malloyStatements = '\n'.repeat(parse.initialCommentsLineCount || 0);

  for (const statement of parse.statements) {
    malloyStatements += '\n';
    if (statement.type === MalloySQLStatementType.MALLOY) {
      malloyStatements += statement.text;
    } else
      malloyStatements += `${'\n'.repeat(
        statement.text.split(/\r\n|\r|\n/).length - 1
      )}`;
  }

  const urlReader = {
    readURL: async (url: URL) => {
      const path = fileURLToPath(url);
      return fs.readFileSync(path, 'utf-8');
    },
  };
  const runtime = new Runtime({urlReader, connection});

  const importBaseURL = url;
  const mm = runtime.loadModel(malloyStatements, {importBaseURL});
  await mm.getModel();

  for (const statement of parse.statements.filter(
    (s): s is MalloySQLSQLStatement => s.type === MalloySQLStatementType.SQL
  )) {
    for (const malloyQuery of statement.embeddedMalloyQueries) {
      try {
        await mm.getQuery(`query:\n${malloyQuery.query}`);
      } catch (e) {
        if (e instanceof MalloyError) {
          e.problems.forEach(log => {
            fixLogRange(url.toString(), malloyQuery, log, -1);
          });
        }
        throw e;
      }
    }
  }
};
