# Malloy example datasets
These examples at designed to be used with [Malloy](http://www.malloydata.dev), a semantic modeling and querying data language. 

A good way to undertand [Malloy](http://www.malloydata.dev) is to load some of these examples and
play with them.  **[Source code for these examples](https://github.com/malloydata/malloy-samples)** can be found on github.


### DuckDB datasets
Data for these dataset is included.  DuckDB is built into both [Malloy Composer](https://github.com/malloydata/malloy-composer) 
and the [Malloy VSCode](https://marketplace.visualstudio.com/items?itemName=malloydata.malloy-vscode) extension.  These example should load without any configuration.

<!-- malloy-app 
  app="auto_recalls" 
  name="Automobile Recalls" 
  description="Public data from data.gov on automobile recalls" 
-->

<!-- malloy-app 
  app="ecommerce" 
  name="eCommerce" 
  description="Example Transactional data for an eCommerce business" 
-->

<!-- malloy-app 
  app="faa" 
  name="FAA" 
  description="A subset of the NTSB Flights Dataset, with information about flights, carriers, aircrafts, and more." 
-->

<!-- malloy-app 
  app="ga4" 
  name="Google Analytics 4" 
  description="Public data from Google Analytics with examples of how to compute user and events statistics." 
-->

<!-- malloy-app 
  app="imdb" 
  name="IMDB" 
  description="IMDb makes data available for download via their website. Used with permission.  Example of how to compute and report metrics about movies and the people who act in them." 
-->

<!-- malloy-app 
  app="names" 
  name="USA Baby Names" 
  description="All births in the USA since 1910 by state, first name, and gender" 
-->

### BigQuery datasets
You will need to log into Google Cloud to use these datasets.  Use the following
commands to log into Google Cloud.

```
gcloud auth login --update-adc
gcloud config set project {my_project_id} --installation
```

<!-- malloy-app 
  app="bigquery_ga_sessions" 
  name="Google Analytics Sessions" 
  description="Public data from Google Analytics with examples of how to compute and report sessions metrics." 
-->

<!-- malloy-app 
  app="bigquery_ga4" 
  name="Google Analytics" 
  description="Public data from Google Analytics with examples of how to compute and report user and events statistics." 
-->

<!-- malloy-app 
  app="bigquery_hackernews" 
  name="Hacker News" 
  description="Posts from news.ycombinator.com" 
-->
