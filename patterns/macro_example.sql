CREATE OR REPLACE TABLE test_data AS SELECT * FROM (VALUES 
  (1, 'carlineng', 10, 'description'),
  (1, 'carlineng', 20, 'description'),
  (1, 'carlineng', 50, 'description'),
  (1, 'carlineng', 90, 'description'),
  (1, 'carlineng', 190, 'this row should be picked'),
  (1, 'carlineng', 120, 'description'),
  (1, 'carlineng', 110, 'description'),
  (2, 'duckdb', 40, 'another description'),
  (2, 'duckdb', 50, 'another description'),
  (2, 'duckdb', 60, 'another description'),
  (2, 'duckdb', 90, 'another description'),
  (2, 'duckdb', 140, 'this row should be picked'),
  (2, 'duckdb', 10, 'another description'),
  (2, 'duckdb', 40, 'another description')
) test_data (id, username, val, col_description)
;

-- Expected result:

WITH ranked AS (
  SELECT
    *
    , row_number() OVER (PARTITION BY id, username ORDER BY val DESC) AS row_rank
  FROM test_data
)
SELECT
  * EXCLUDE (row_rank)
FROM ranked
WHERE row_rank = 1
;

CREATE OR REPLACE MACRO dedupe_func(
    unique_cols,
    order_by_col
) AS TABLE (
  WITH ranked_tbl AS (
    SELECT 
      *
      , row_number() OVER (
        PARTITION BY COLUMNS( c -> (list_contains(unique_cols, c)) )
        ORDER BY order_by_col DESC
        -- ORDER BY COLUMNS (order_by_col) fails with Parser Error
        -- "Cannot ORDER BY ALL in a window expression"
        ) AS row_rank
    FROM __input_cte
  )
  SELECT
    * EXCLUDE (row_rank)
  FROM ranked_tbl
  WHERE row_rank = 1
);


WITH __input_cte AS (
    SELECT * FROM test_data
)
SELECT *
FROM dedupe_func(['id', 'username'], val)
;
