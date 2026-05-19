# Malloy Analysis Samples

This repo has Malloy notebooks (and associated datasets) that run against real public datasets - FAA flights, IMDb, e-commerce, GA4, NHTSA recalls - plus a [patterns library](patterns/) covering common analytics tasks. Every example runs locally on DuckDB with no setup - clone the repo, open a `.malloynb` in VS Code, hit Run.
Familiarity with SQL concepts (GROUP BY, aggregates, joins) is helpful but not required.

<div  align='center'>

[Try in Browser](https://github.dev/malloydata/malloy-samples) · [Quickstart](https://docs.malloydata.dev/documentation/user_guides/basic.html) · [Slack](https://malloydata.github.io/slack)

</div>


[Malloy](https://github.com/malloydata/malloy) is an open source semantic modeling and query language that compiles to SQL.

These samples are a great way to learn Malloy’s core ideas and techniques (reusable joins, fan-out-safe aggregates, consistent measures, first-class nested data, and readable multi-step transforms) using real data.

---

## What's in this repo

Every example is a [Malloy notebook](https://docs.malloydata.dev/documentation/user_guides/notebook_basics.html) (`.malloynb`) - runnable directly in VS Code or in your browser. The examples run on **DuckDB** against pre-bundled Parquet files, so no database setup is required. A separate set of examples uses BigQuery; those are **optional** and only needed if you want to query BigQuery datasets directly.

| Folder | What it demonstrates |
|---|---|
| [`names/`](names/) | Hello-World - your first source, dimension, and measure |
| [`faa/`](faa/) | Realistic multi-table model: joins, symmetric aggregates, sessionization |
| [`ecommerce/`](ecommerce/) | E-commerce semantic model with derived dimensions and nested subtotals |
| [`imdb/`](imdb/) | Many-to-many joins on the IMDb dataset (films, cast, crew) |
| [`auto_recalls/`](auto_recalls/) | NHTSA recall data - text search and dimensional indexes |
| [`patterns/`](patterns/) | Bite-size notebooks teaching individual Malloy idioms (see matrix below) |
| [`cubed_data/`](cubed_data/) | Composite sources / cubes - multi-grain aggregations unified in one model |
| [`ga4/`](ga4/) | Google Analytics 4 events (DuckDB on a sample export) |
| [`bigquery/`](bigquery/) | Same-style examples against BigQuery public datasets (**optional**, requires GCP) |

---

## Start here - a 15-minute tour

If you're new to Malloy, walk through these examples in order. Each one builds on the last.

1. **[`names/names1.malloynb`](names/names1.malloynb)** - your first source + measure on a single table.
2. **[`faa/README.malloynb`](faa/README.malloynb)** - a real multi-table semantic model with joins and symmetric aggregates, run against real FAA flight data.
3. **[`patterns/foreign_sums.malloynb`](patterns/foreign_sums.malloynb)** - *why* Malloy isn't just SQL: symmetric aggregates that don't double-count across joins.
4. **[`ecommerce/README.malloynb`](ecommerce/README.malloynb)** - a larger model with derived dimensions, nested subtotals, and reusable measures.
5. **[`patterns/`](patterns/)** - pick the pattern that matches the problem you're solving (see matrix below).

When you're ready for the full language reference, head to the [Malloy docs](https://docs.malloydata.dev/documentation/).

---

## Data Analysis Patterns

Once you've finished the tour, the patterns library is a reference organized by use case. Each notebook covers one pattern - find the group that matches your task.

### Joins and symmetric aggregates
* [Foreign Sums](patterns/foreign_sums.malloynb) - Malloy can aggregate safely anywhere in a network of joins. Examples explain the different patterns.
* [Nested Subtotals](patterns/nested_subtotals.malloynb) - With a single table you can only look at one or two perspectives at a time. With nesting, this is unlimited.

### Time analysis and cohorts
* [Year over Year](patterns/yoy.malloynb) - Several different ways of doing timeframe comparisons.
* [Moving Average](patterns/moving_avg.malloynb) - Moving averages give a better idea of trends.
* [Cohort Analysis](patterns/cohorts.malloynb) - See how groups of people behave over time.

### Distributions and rollups
* [Percent of Total](patterns/percent_of_total.malloynb) - Level-of-detail calculations make percent of total easy at any level of hierarchy.
* [Auto-binning Histograms](patterns/autobin.malloynb) - Malloy dynamically figures out the appropriate bucketing for the data - no fixed axis needed.
* [Other Bucket](patterns/other.malloynb) - Look at several groups and combine the rest into "Other".

### Working with nested or non-tabular data
* [Reading Nested Data](patterns/reading_nested.malloynb) - JSON, Parquet, Protobuf, and log data are often a graph, not a table. Malloy reads and aggregates from anywhere in the graph.
* [Unnesting Arrays](patterns/unnest_data.malloynb) - How to work with array-valued columns.
* [Data from JSON API](patterns/apijson.malloynb) - Use a JSON API endpoint as a data source.
* [Sessionize / Map-Reduce](patterns/sessionize.malloynb) - Read events and combine them into sessions.

### Other techniques
* [Dimensional Indexes](patterns/dim_index.malloynb) - Find the most common values in your dataset.
* [Transform Pipelines](patterns/transform.malloynb) - Chain multiple query stages with `->` to build readable multi-step analyses.

---

## Run locally

### Easiest: in your browser

If you're viewing this on GitHub:

1. Make sure you're signed in.
2. Press **`.`** (period) - this opens the repo in [github.dev](https://github.dev/), a browser-based VS Code.
3. Install the **Malloy** extension when prompted.
4. Open any `.malloynb` and run cells - DuckDB is bundled.

### Locally with VS Code

1. Clone this repo.
2. Install the [Malloy VS Code extension](https://docs.malloydata.dev/documentation/setup/extension.html).
3. Open any `.malloynb` and click **Run**.

DuckDB ships inside the extension - no extra setup. Parquet data files are committed in [`data/`](data/) and each sample's own `data/` directory.

### Optional: BigQuery samples

The [`bigquery/`](bigquery/) directory contains examples that query public datasets (Hacker News, The Met, GA Sessions). These are **optional** and require a Google Cloud login. If you don't have GCP access, just skip this directory - every other sample runs locally on DuckDB.

To enable BigQuery samples, [authenticate the Malloy extension to BigQuery](https://docs.malloydata.dev/documentation/setup/extension.html#bigquery).

---

## Validate the samples

To compile every sample (catches breakage after a Malloy upgrade):

```bash
npm ci
npm run test-silent
```

The DuckDB suite always runs. The BigQuery suite is skipped automatically when no credentials are present (`GOOGLE_APPLICATION_CREDENTIALS`, `BIGQUERY_KEY`, or `gcloud` application default credentials), so this command is safe to run without a Google Cloud account.

To bump to the latest published Malloy and re-test:

```bash
npm run malloy-update
npm run test-silent
```

---

## Learn more

- **[Malloy language docs](https://docs.malloydata.dev/documentation/)** - full reference
- **[Malloy by Example](https://docs.malloydata.dev/documentation/user_guides/malloy_by_example)** - advanced modeling patterns
- **[Malloy GitHub repo](https://github.com/malloydata/malloy)** - compiler, connectors, roadmap
- **[Publisher](https://github.com/malloydata/publisher)** - serve `.malloy` models via REST and MCP for apps and AI agents

---

## Contributing

Found a bug or have an idea for a new pattern? Open an [issue](https://github.com/malloydata/malloy-samples/issues) or a PR. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for DCO and licensing requirements.
