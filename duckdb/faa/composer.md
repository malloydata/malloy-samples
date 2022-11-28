# About the FAA Dataset

The NTSB FAA Dataset includes information about flights, airports, carriers, and aircrafts. We are providing here a small subset of the full dataset (available in BigQuery) for the purpose of trying out Malloy.

**IMPORTANT NOTE**: this dataset is a partial sample for demonstration only, and to properly analyze the data, the full dataset available in BigQuery should be used.

## What is this?

[Malloy Composer](https://github.com/malloydata/malloy-composer) is an open source tool for viewing and exploring data sets.  Data models are created in the  [Malloy](https://github.com/malloydata/malloy/) language.  Data can be served from a simple web server or from a SQL database.  

See the [Malloy source code](https://github.com/malloydata/malloy-samples/tree/main/duckdb/faa) for this data set.


## Carrier-ed Away

<!-- malloy-query  
  name="Top Carriers"
  model="./flights.malloy"
  description="Top ten carriers by count of flights"
  renderer="table"
-->
```
query: flights -> top_carriers
```

<!-- malloy-query  
  name="Flights Over Time by Carrier"
  model="./flights.malloy"
  renderer="line_chart"
-->
```
query: flights -> carriers_over_time
```


<!-- malloy-query  
  name="Top Routes by Carrier"
  model="./flights.malloy"
  description="Returns a map of the top 100 routes for each carrier"
-->
```
  query: carrier_routes is flights -> {
    group_by: carrier_name is carriers.nickname
    aggregate: flight_count
    nest: top_routes_map
  }
```

<!-- malloy-query  
  name="Carrier Quick Overview"
  model="./flights.malloy"
  renderer="dashboard"
  description="A dashboard showing high-level information for each Carrier"
-->
```
   query: carrier_overview is flights -> {
    group_by: carrier_name is carriers.nickname
    aggregate:
      flight_count
      percent_of_this_carriers_flights_to_all_destinations
        is flight_count/all(flight_count)*100
    nest: top_destinations + {
      aggregate:
        flights_to_dest_all_carriers is exclude(flight_count, carrier_name)
        percent_of_all_flights_to_this_destination_by_this_carrier
          is flight_count/exclude(flight_count, carrier_name)*100
      limit: 5
    }
   }
```

<!-- malloy-query  
  name="United Airlines Full Dashboard"
  model="./flights.malloy"
  renderer="dashboard"
  description="A much more detailed and rich dashboard; can be filtered to any Carrier."
-->
```
query: flights -> carrier_dashboard + {where: carrier = 'UA'}
```


<!-- malloy-query  
  name="Aircraft Summary"
  model="./flights.malloy"
  renderer="dashboard"
  description="Shows metrics about the fleet of each Carrier. Note: This represents a small sample of the complete FAA dataset!"
-->
```
  query: carrier_aircraft is flights -> {
    group_by: carriers.nickname
    aggregate:
      aircraft.aircraft_count
      average_plane_size
      flight_count
      average_flight_distance
      seats_owned
    nest: by_manufacturer is {
      group_by: aircraft.aircraft_models.manufacturer
      aggregate:
        aircraft.aircraft_count
        average_plane_size
        flight_count
        average_flight_distance
        seats_owned
    }
  }
```

<!-- malloy-query  
  name="Sessionisation Example"
  model="./flights.malloy"
  renderer="dashboard"  
  description="If we think of aircraft flights as a transaction.  We can roll up all transactions in a given day by a carrier into a single nested table. Note: This represents a small sample of the complete FAA dataset!"
-->
```
query: sessionize is flights -> {
    where: 
      dep_time.day = @2002-03-03,
      carrier = 'WN' | 'DL'
    group_by: flight_date is dep_time.day
    group_by: carrier
    aggregate: 
      daily_flight_count is flight_count
      aircraft.aircraft_count
    nest: per_plane_data is {
      top: 20
      group_by: tail_num
      aggregate: plane_flight_count is flight_count
      nest: flight_legs is {
        order_by: 2
        group_by:
          tail_num
          dep_minute is dep_time.minute
          origin_code
          dest_code is destination_code
          dep_delay
          arr_delay
      }
    }
  }
```


## Destination Deep Dive

<!-- malloy-query  
  name="Chicago Over Time"
  model="./flights.malloy"
  description="The most popular destinations from Chicago, over time"
  renderer="dashboard"
-->
```
  query: chicago_over_time is flights -> top_destinations {
    where: origin.code = 'ORD'
    nest: carriers_over_time
    limit: 20
  }
```

<!-- malloy-query  
  name="Flight Traffic YOY by Destination"
  model="./flights.malloy"
  description="For each destination, shows flights in 2003 and 2004, as well as the delta and growth between the two years."
-->
```
  query: by_destination_growth_rate is flights -> {
    group_by: destination.name
    aggregate: 
      flight2004 is flight_count {? dep_time: @2004}
      flight2003 is flight_count {? dep_time: @2003}
      delta is (flight_count {? dep_time: @2004}) - (flight_count {? dep_time: @2003})
      growth is ((flight_count {? dep_time: @2004}) - (flight_count {? dep_time: @2003}))/(flight_count {? dep_time: @2004})*100
  }
```

<!-- malloy-query  
  name="Carrier Popularity Over Time By Destination"
  model="./flights.malloy"
  description="Returns a line chart of carrier flights over time for each destination"
-->
```
  query: flights -> {
    group_by: destination.name
    aggregate: flight_count
    nest: carriers_over_time
    limit: 10
  }
```



## About Malloy Composer

Composer is implemented using Malloy, DuckDB and WASM and runs completely
in your browser.  Javascript code is compiled from here:

  https://github.com/malloydata/malloy-composer
  
 and distributed from here:
 
   https://github.com/lloydtabb/malloy_fiddle_dist
