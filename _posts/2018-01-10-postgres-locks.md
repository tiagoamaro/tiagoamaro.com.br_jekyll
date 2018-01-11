---
title: Postgres Locks and SKIP LOCKED - Updating Records in Parallel
layout: post
---

In this post, I'll show how I solved the following challenge: avoid database deadlocks while updating Postgres records
in parallel using Postgres' locking clause.

In an application I was developing, I had the following data structure: a product with many offers, where offers needed
to be ranked by their price grouped per product. With that logic, I thought on possible approaches to calculate ranking:

1. Calculate the ranking whenever the offer price was updated
2. Create background workers at the application level to handle the offer ranking update
3. Delegate ranking calculation to the database (using triggers)

With the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle) in mind, I tried the first implementation.

## First Approach: Updating Ranking Through a Callback

This first approach was the naive one: creating an operation to update an offer's ranking whenever its price was updated.
This works fine if your operations are executed in serial, but if you update several records in parallel, you'll face some
issues with your database locking system.

In my case, I had the Puma server executing multiple calls to fetch prices in real time.

With multiple processes updating prices simultaneously, updating offers prices got me into a deadlock scenario,
where the same database row was being updated multiple times on different transactions. In this case, wrapping the ranking
update operation into a transaction would also not work, since multiple transactions would still fall in deadlocks. 

Since this scenario looked like a "queue", a background queueing logic could solve the deadlock issue.

## Second Approach: Background Workers

The second approach wasn't even implemented, since background workers should always be executed in parallel, as its goal is
to speed up or defer costly jobs.

Updating a single attribute isn't expensive, and it's serial execution nature is the real problem.

## Third Approach: Database Triggers

Since deadlocks were the problem, deferring the issue to the database seemed to be the most logical approach.

Using triggers at the offers' table seemed the right approach, but the deadlocks would also occur on triggers if records
were not selected with the right locking mechanism. So, my research began on which mechanism would be the right one to
approach this issue.

Going through Postgres' documentation, the [`SKIP LOCKED` locking clause](https://www.postgresql.org/docs/10/static/sql-select.html#SQL-FOR-UPDATE-SHARE)
seemed to solve the issue with the following caveat:

> With SKIP LOCKED, any selected rows that cannot be immediately locked are skipped. Skipping locked rows provides an
> inconsistent view of the data, so this is not suitable for general purpose work, but can be used to avoid lock contention
> with multiple consumers accessing a queue-like table.

This is an acceptable trade-off, since offer ranking is updated as a "queue-like table".

With this, I started porting my update operation to a Postgres trigger.

## Postgres Implementation

With the "one to many" relationship between offers and products, and the `product_id` being the foreign key for the products
table, I wrote the following trigger: 

```sql
CREATE FUNCTION calculate_offer_product_ranking() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  WITH offer_scope AS (
      SELECT *
      FROM offers
      WHERE product_id = NEW.product_id
      FOR UPDATE SKIP LOCKED
  ), ranked_offers AS (
      SELECT
        id,
        row_number()
        OVER (
          PARTITION BY product_id
          ORDER BY CAST(price AS FLOAT) ) AS ranking
      FROM offer_scope
      WHERE offer_scope.product_id = NEW.product_id
  )

  UPDATE offers
  SET product_price_ranking = ranked_offers.ranking
  FROM ranked_offers
  WHERE offers.id = ranked_offers.id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER calculate_offer_product_ranking_trigger AFTER INSERT OR UPDATE OF price ON offers FOR EACH ROW EXECUTE PROCEDURE calculate_offer_product_ranking();
```

> If you're not familiar with the `WITH` clause, nor Postgres window functions (`PARTITION BY`), I would highly recommend
> you reading their docs, as these functions are quite useful when grouping data:
> 
> - [`WITH` queries docs](https://www.postgresql.org/docs/current/static/queries-with.html)
> - [Window functions docs](https://www.postgresql.org/docs/current/static/tutorial-window.html)

## Conclusion

This challenge reminded me that not all business rules will go to your application layer, as your database is a powerful
tool. Databases are incredible, reliable and optimized pieces of software, being able of more than "just storing data".

With this database trigger calculating offers' ranking, I could guarantee ranking without creating any workarounds on my
application layer to execute a task native to the database: atomicity and consistency. 
