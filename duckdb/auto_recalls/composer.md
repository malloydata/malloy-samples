# Automobile Recalls
This data is the entire recall dataset from the NHTSA.  Source data can be found.

https://catalog.data.gov/dataset/recalls-data

## What is this?

[Malloy Composer](https://github.com/malloydata/malloy-composer) is an open source tool for viewing and exploring data sets.  Data models are created in the  [Malloy](https://github.com/malloydata/malloy/) language.  Data can be served from a simple webserver or from a SQL database.  

See the [Malloy source code](https://github.com/malloydata/malloy-samples/tree/main/duckdb/auto_recalls) for this data set.


## Explore Auto Recalls


<!-- malloy-query  
  name="Recall Dashboard"
  description="by manufacturer, look at recall history."
  model="./auto_recalls.malloy"
  renderer="dashboard"
-->
```malloy
  query: recalls -> recall_dashboard
```


<!-- malloy-query  
  name="Most Recent Recalls"
  model="./auto_recalls.malloy"
-->
```malloy
  query: recalls -> recent_recalls + {limit: 100}
```

<!-- malloy-query  
  name="Largest Recalls"
  model="./auto_recalls.malloy"
  description="There have been some historically large recalls, from Honda airbags, to Firestone Tires with separating treads.  Here is a list of the largest recalls of all time."
-->
```malloy
  query: recalls -> biggest_recalls + {limit: 100}
```

<!-- malloy-query  
  name="Manufacturer's Recalls over Time"
  model="./auto_recalls.malloy"
  description="Line chart of the top manufacturers over time"
  renderer="line_chart"
-->
```malloy
  query: recalls -> by_year_manufacturer_line_chart 
```

## About Malloy Composer

Composer is implemented using Malloy, DuckDB and WASM and runs completely
in your browser.  Javascript code is compiled from here:

  https://github.com/malloydata/malloy-composer
  
 and distributed from here:
 
   https://github.com/lloydtabb/malloy_fiddle_dist
