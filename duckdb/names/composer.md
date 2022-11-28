# USA Names
This data comes form the Social Security Administration Names data.  The
data contains the number of births for each state, year and gender.


[Malloy Composer](https://github.com/malloydata/malloy-composer) is an open source tool for viewing and exploring data sets.  Data models are created in the  [Malloy](https://github.com/malloydata/malloy/) language.  Data can be served from a simple web server or from a SQL database.  

See the [Malloy source code](https://github.com/malloydata/malloy-samples/tree/main/duckdb/names) for this data set.

## Explore Names

Use the dashboard below to compare a bunch of names. Change the filter to select different names.

<!-- malloy-query  
  name="Name Dashboard - Compare Names"
  model="names.malloy"
  renderer="dashboard"
-->
```malloy
query: names2 -> name_dashboard
```

## Names by Generation

See each generation's most popular names and which states they are most popular in.  Scanning these results I noticed that in many of these names, Colorado is over represented.  Do you have any theories as to why these names are more popular in Colorado?

<!-- malloy-query  
  name="Current: Most popular female names on or after 2010"
  model="names.malloy"
-->
```malloy
  query: names2 -> names_chart + {
    where: gender = 'F'
    where: year_born ? >= 2010
  }
```

<!-- malloy-query  
  name="Current: Most popular male names on or after 2010"
  model="names.malloy"
-->
```malloy
  query: names2 -> names_chart + {
    where: gender = 'F'
    where: year_born ? >= 2010
  }
```

<!-- malloy-query  
  name="Gen-Z: Most popular female names between 1995 and 2010"
  model="names.malloy"
-->
```malloy
  query: names2 -> names_chart + {
    where: gender = 'F'
    where: year_born ? >= 1995 & <= 2010
  }
```

<!-- malloy-query  
  name="Gen-Z: Most popular male names  between 1995 and 2010"
  model="names.malloy"
-->
```malloy
  query: names2 -> names_chart + {
    where: gender = 'F'
    where: year_born ? >= 1995 & <= 2010
  }
```

<!-- malloy-query  
  name="Millennial: Most popular female names between 1980 and 1995"
  model="names.malloy"
-->
```malloy
  query: names2 -> names_chart + {
    where: gender = 'F'
    where: year_born ? >= 1980 & <= 1996
  }
```

<!-- malloy-query  
  name="Millennial: Most popular male names  between 1980 and 1995"
  model="names.malloy"
-->
```malloy
  query: names2 -> names_chart + {
    where: gender = 'F'
       where: year_born ? >= 1980 & <= 1996
  }
```

## Iconic Names

For each state, which names are the most Iconic (unusually popular)?
 
 <!-- malloy-query  
  name="Iconic Names by State"
  model="names.malloy"
-->
```malloy
query: names2 -> iconic_names_by_state
```


## Names and Gender
Some names are gender neutral or gender specific by time or region.  

 <!-- malloy-query  
  name="Gender Neutral Names"
  description="Some names can be are common for both female and male genders.  This query investigates gender neutral names and their use over time and location."
  model="names.malloy"
-->
```malloy
query: names2 -> gender_neutral_names
```

 <!-- malloy-query  
  name="Kelly in Space and Time"
  description="Examine the name 'Kelly' over time and location (in fine detail)."
  model="names.malloy"
  renderer="dashboard"
-->
```malloy
query: names2 -> kelly_time_space_dashboard
```

 <!-- malloy-query  
  name="Resurgent Names"
  description="Names, once popular, lose popularity and then, sometime later, re-gain popularity.  This query finds those names.  We find the two most popular decades for a given name and the time difference between them"
  model="names.malloy"
-->
```malloy
query: names2 -> resurgent_names
```


## About Malloy Composer

Composer is implemented using Malloy, DuckDB and WASM and runs completely
in your browser.  Javascript code is compiled from here:

  https://github.com/malloydata/malloy-composer
  
 and distributed from here:
 
  https://github.com/lloydtabb/malloy_fiddle_dist
