title: Functionally Competent
date: 2012-01-13
---
Here’s a piece of somewhat–ugly, single–purpose [Python][python] code, what it does is not particularly interesting:

[sourcecode:python]
    def span(data):
       r = []
       for row in data:
           if r and row[1] == r[-1][2]:
               r[-1][1] = row[0]
           else:
               r.append([row[0], row[0], row[1]])
       return r
[/sourcecode]

After a couple of days of wondering how this might be done in [Clojure][clojure], I stumbled upon the idea of a partition, and went looking in the docs. Here’s the Clojure version:

[sourcecode:clojure]
    (defn span [data]
      (map (fn [spn] [(first (first spn))
                      (first (last spn))
                      (second (first spn))])
        (partition-by (fn [row] (second row)) data)))
[/sourcecode]

To my eye, the Clojure version is a lot nicer (although it could be novelty, or the square brackets containing “magic numbers” in the Python version).

The beauty of the Clojure version comes from the `partition-by` function, replicated below:

[sourcecode:clojure]
    (defn partition-by
      [f coll]
      (lazy-seq
       (when-let [s (seq coll)]
         (let [fst (first s)
               fv (f fst)
               run (cons fst (take-while #(= fv (f %)) (next s)))]
           (cons run (partition-by f (seq (drop (count run) s))))))))
[/sourcecode]

After a few minutes of working out what it does, it “popped”, and at the same time I had a break–through in my understanding of functional programming.

For completeness, here’s a version of `partition-by` in Python:

[sourcecode:python]
    import itertools

    def partition_by(f, coll):
        if not coll:
            return []
        head, tail = coll[0], coll[1:]
        run = [head] + list(itertools.takewhile(lambda t: f(t) == f(head), tail))
        return [run] + func_partition_by(f, coll[len(run):])
[/sourcecode]

Which can be used to refactor the original `span` function to:

[sourcecode:python]
    def span(data):
        return map(
            lambda r: [r[0][0], r[-1][0], r[0][1]],
            partition_by(lambda row: row[1], data))
[/sourcecode]

The nice thing about the original Clojure version, and the final Python version is that the format of the “rows”, and the logic for partitioning data are separate: something I wouldn’t have done if it weren’t for my recent interest in Clojure.


[python]: http://python.org/
[clojure]: http://clojure.org/
