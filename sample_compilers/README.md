# Sample Scripts

A set of sample scripts for working with Malloy models.

## Setup

First, run `npm install`

## compile_malloy_duckdb.js (node.js)

A script to compile a Malloy model. Returns JSON containing either the compiled model or a list of compilation errors.

```
  $ npm run compile ../faa/flights.malloy
```

OR 

```
  $ node compile_malloy_duckdb.js ../faa/flights.malloy
```


