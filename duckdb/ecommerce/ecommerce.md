# eCommerce
This dataset represents transactional database for a fictitious eCommerce business. 

## What is this?

[Malloy Composer](https://github.com/malloydata/malloy-composer) is an open source tool for viewing and exploring data sets.  Data models are created in the  [Malloy](https://github.com/malloydata/malloy/) language.  Data can be served from a simple webserver or from a SQL database.  

See the [Malloy source code](https://github.com/malloydata/malloy-samples/tree/main/duckdb/ecommerce) for this data set.


## Queries

<!-- malloy-query
name="Business Overview"
description="A high level overview of the performance of the business"
model="./ecommerce.malloy"
renderer="dashboard"
-->
```malloy
query: order_items -> business_overview_dashboard
```

<!-- malloy-query
name="Customer Look-up"
description="Look up information about a customer and view their history."
model="./ecommerce.malloy"
renderer="dashboard"
-->
```malloy
query: order_items -> customer_dashboard {where: users.full_name = 'Mary Smith'}
```

<!-- malloy-query
name="Brand Dashboard"
description="An overview of brand performance"
model="./ecommerce.malloy"
renderer="dashboard"
-->
```malloy
query: order_items -> brand_dashboard
```

<!-- malloy-query
name="Frequent Returners"
description="Lists individuals who return a lot of merchandise"
model="./ecommerce.malloy"
renderer="table"
-->
```malloy
query: order_items -> frequent_returners
```

