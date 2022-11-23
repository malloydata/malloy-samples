# Iowa State Store Liquor Purchases
In Iowa, all liquor stores are own by the state.  The store's purchases are a matter of public record.  

## What is this?

[Malloy Composer](https://github.com/malloydata/malloy-composer) is an open source tool for viewing and exploring data sets.  Data models are created in the  [Malloy](https://github.com/malloydata/malloy/) language.  Data can be served from a simple web server or from a SQL database.  

See the [Malloy source code](https://github.com/malloydata/malloy-samples/tree/main/bigquery/iowa) for this data set.


## Overview

The query below will give you a feel for the market as a whole.  Notice that some of the top seller are a huge part of the market.  For example Tito's vodka is 3.5% of all liquor sales in Iowa.

<!-- malloy-query 
  name="Overview"
  model="./iowa.malloy"
  renderer="dashboard"
-->
```malloy
query: iowa-> {
  nest: by_class
  nest: by_vendor_bar_chart
  nest: by_month
  nest: top_sellers_by_revenue + {limit: 10}
  nest: most_expensive_products + {limit: 10}
  nest: top_10_counties is {
    group_by: county
    aggregate: total_sale_dollars
    limit: 10
  }
}
```

## Lookup Dashboards
Examine the market for a particular class of alcohol.  

<!-- malloy-query 
  name="Vodka Dashboard"
  model="./iowa.malloy"
  renderer="dashboard"
-->
```malloy
query: iowa->vendor_dashboard {
  where: category_class ? 'VODKAS'
}
```

<!-- malloy-query 
  name="Tequila Dashboard"
  model="./iowa.malloy"
  renderer="dashboard"
-->
```malloy
query: iowa->vendor_dashboard {
  where: category_class ? 'TEQUILAS'
}
```

<!-- malloy-query 
  name="Whisky Dashboard"
  model="./iowa.malloy"
  renderer="dashboard"
-->
```malloy
query: iowa->vendor_dashboard {
  where: category_class ? 'WHISKIES'
}
```

<!-- malloy-query 
  name="Rum Dashboard"
  model="./iowa.malloy"
  renderer="dashboard"
-->
```malloy
query: iowa->vendor_dashboard {
  where: category_class ? 'RUM'
}
```

<!-- malloy-query 
  name="Gin Dashboard"
  model="./iowa.malloy"
  renderer="dashboard"
-->
```malloy
query: iowa->vendor_dashboard {
  where: category_class ? 'GINS'
}
```

## Vendor Dashboards
Examine the sales of a particular vendor.

<!-- malloy-query 
  name="Jim Beam Vendor Dashboard"
  model="./iowa.malloy"
  renderer="dashboard"
-->
```malloy
query: iowa->vendor_dashboard {
  where: vendor_name ? ~ r'JIM BEAM'
}
```

<!-- malloy-query 
  name="Luxco Vendor Dashboard"
  model="./iowa.malloy"
  renderer="dashboard"
-->
```malloy
query: iowa->vendor_dashboard {
  where: vendor_name ? ~ r'LUXCO'
}
```

