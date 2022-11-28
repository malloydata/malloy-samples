# Hacker News
All the Hacker News (news.ycombinator.com) posts, ever.


## What is this?

[Malloy Composer](https://github.com/malloydata/malloy-composer) is an open source tool for viewing and exploring data sets.  Data models are created in the  [Malloy](https://github.com/malloydata/malloy/) language.  Data can be served from a simple web server or from a SQL database.  

See the [Malloy source code](https://github.com/malloydata/malloy-samples/tree/main/bigquery/hackernews) for this data set.

## Queries

<!-- malloy-query
name="Term Dashboard - BigQuery"
description="Stories about BigQuery over time"
model="./hackernews.malloy"
renderer="dashboard"
-->
```malloy
query: stories -> term_dashboard {
  where: title ~ r'BigQuery'
}
```

<!-- malloy-query
name="Posts over Time"
description="Graph of of post over time"
model="./hackernews.malloy"
renderer="line_chart"
-->
```malloy
query: stories -> posts_over_time + { 
  limit: 100000   
}
```

<!-- malloy-query
name="Interesting or Not"
description="Most posts get no traction.  is_interesting is a post with traction"
model="./hackernews.malloy"
-->
```malloy
query: stories ->  { 
  group_by: is_interesting
  aggregate: post_count   
}
```

<!-- malloy-query
name="Facebook, Apple, Amazon, Netflix and Google over time"
description="Graph of the FAANG companies"
model="./hackernews.malloy"
renderer="line_chart"
-->
```malloy
query: stories -> posts_over_time + { 
  where: is_interesting, faang != 'OTHER'
  group_by: faang
  limit: 100000 
}
```
