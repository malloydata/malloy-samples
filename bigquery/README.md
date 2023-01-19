# BigQuery Sample Models

You will need to log into Google Cloud to use these datasets.  Use the following
commands to log into Google Cloud.

```
gcloud auth login --update-adc
gcloud config set project {my_project_id} --installation
```

## [FAA](faa)

This set of models points at a publicly available FAA flights dataset including information on flights, airports, air crafts and aircraft models from 2000 to 2005. A wide variety of patterns and features are used in this model and any of our examples in documentation are based on this dataset, so it's a great place to start as you get to know Malloy.

## [Iowa Liquor](iowa)

Liquor sales in Iowa are state-controlled, with all liquor wholesale run by the state. All purchases and sales of liquor that stores make are a matter of public record. A walk through of exploring and modeling this dataset can be found [here](https://malloydata.github.io/documentation/examples/iowa/iowa.html); this makes a great introduction to Malloy.

## [E-commerce](ecommerce)

This model points to a dataset for a fictitious e-commerce business. It has a  clean and typical schema for a transactional dataset. It also includes an example of an interesting brand affinity analysis (people who buy x also buy y). An example of how to use dataset can be found [here](https://malloydata.github.io/documentation/examples/ecommerce.html).

## [GA Sessions](gs_sessions)

Malloy is ideally suited to working with nested data, and this is the place to see why. See how easily data at any level of nesting can be accessed and aggregated without needlessly complex queries or use of CTEs. A walk through of exploring and modeling this dataset can be found [here](https://malloydata.github.io/documentation/examples/ga_sessions.html).

## [Hacker News](hackernews)

This is just a fun dataset. Includes examples of using regular expressions to parse data, [pick](https://malloydata.github.io/documentation/language/expressions#pick-expressions) (Malloy's improvement upon CASE statements), and [imports](https://malloydata.github.io/documentation/language/imports.html) to spin off a specific analysis of posts about FAANG companies.

## [Names](names)

A look at baby names in the United States by gender, state, and year, since 1910. Includes an example of cohorting names by aggregating safely across different levels of nesting. You can see how to play the Name Game [here](https://malloydata.github.io/documentation/examples/names.html).

## [The Met](the_met)

Looks at a catalog of over 200,000 public domain items from The Met (The Metropolitan Museum of Art). The catalog includes metadata about each piece of art, along with an image or images of the artifact.

## [Wordlebot](wordle)

Let Wordlebot solve Wordle for you (or if you're like us, see if it can beat you after you've played!). This is an example of an advanced analysis to solve a tricky problem. We have a walk through and examples of how we used the model to solve Wordle puzzles available [here](https://malloydata.github.io/documentation/examples/wordle/wordle.html).
