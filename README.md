# JSON Selector Benchmark 🚀
This repository benchmarks various ways of retrieving data from a JSON object using a string-based JSON selector. It benchmarks the libraries against a couple of test suites, each emphasizing simpler or more complex cases of usage. In cases where selectors can be pre-compiled, they are included as a seperate suite case, affixed with `-compiled`.

These JSON Selectors are currently evaluated in NodeJS, but should be applicable in the browser as well.

### What is a JSON Selector?
I see a JSON selector as a string (e.g. `foo.bar[].value`) that can be applied to a Javascript object / JSON file (e.g. `{ foo: { bar: [{ value: 1, value 2 }] } }`) such that the result is a subset of the latter based on a filter using the former. 

JSON selectors make it easier to query one or more JSON files when the content isn't always fully know upfront, or when the accessors or filters are loaded in dynamically.

## Compared Libraries
The following libraries are compared against eachother. 
NOTE: Not all libraries have same featureset. Some libraries are advantaged in one test, while being slower or not measured in another. The idea is that you get to compare against your particular workdload and optimize for it.

* [_.get](https://lodash.com/docs/4.17.15#get)
* [@gizt/selector](https://www.npmjs.com/package/@gizt/selector)
* [jsonpath](https://github.com/dchester/jsonpath)
* [jsonpath-wasm](https://github.com/freestrings/jsonpath)
* [jmespath](https://github.com/jmespath/jmespath.js)
* [@metrichor/jmespath](https://github.com/nanoporetech/jmespath-ts)
* [node-jq](https://github.com/sanack/node-jq) (currently disabled as it performs horrendously and breaks the suites)

## Results
*All suites are run against a 2021 Macbook Pro (M1 Max, 16GB RAM, NodeJS v16.13.1)*

* [simple](./benchmark/results/simple.chart.html)
```
Running "simple" suite...
Progress: 100%

  _.get:
    38 279 550 ops/s, ±0.27%   | 36.45% slower

  @gizt/selector:
    6 272 716 ops/s, ±0.53%    | 89.59% slower

  jsonpath:
    384 142 ops/s, ±0.12%      | 99.36% slower

  jsonpath-wasm:
    304 032 ops/s, ±0.81%      | slowest, 99.5% slower

  jsonpath-wasm-compiled:
    396 460 ops/s, ±0.93%      | 99.34% slower

  jmespath:
    3 094 390 ops/s, ±0.29%    | 94.86% slower

  @metrichor/jmespath:
    10 661 210 ops/s, ±0.67%   | 82.3% slower

  @metrichor/jmespath-compiled:
    60 234 128 ops/s, ±1.06%   | fastest

Finished 8 cases!
  Fastest: @metrichor/jmespath-compiled
  Slowest: jsonpath-wasm
```

* [double-nested-first](./benchmark/results/double-nested-first.chart.html)
```
Running "double-nested-first" suite...
Progress: 100%

  _.get:
    6 772 256 ops/s, ±0.26%   | fastest

  @gizt/selector:
    753 729 ops/s, ±0.17%     | 88.87% slower

  jsonpath:
    78 219 ops/s, ±0.58%      | 98.85% slower

  jsonpath-wasm:
    23 465 ops/s, ±0.97%      | 99.65% slower

  jsonpath-wasm-compiled:
    15 506 ops/s, ±4.01%      | slowest, 99.77% slower

  jmespath:
    990 566 ops/s, ±0.21%     | 85.37% slower

  @metrichor/jmespath:
    1 303 746 ops/s, ±0.13%   | 80.75% slower

  @metrichor/jmespath-compiled:
    1 623 525 ops/s, ±0.36%   | 76.03% slower

Finished 8 cases!
  Fastest: _.get
  Slowest: jsonpath-wasm-compiled
```

* [doubled-nested-all](./benchmark/results/double-nested-all.chart.html)
```
Running "double-nested-all" suite...
Progress: 100%

  @gizt/selector:
    499 494 ops/s, ±0.42%     | 68.38% slower

  jsonpath:
    51 699 ops/s, ±0.33%      | 96.73% slower

  jsonpath-wasm:
    14 978 ops/s, ±1.62%      | slowest, 99.05% slower

  jsonpath-wasm-compiled:
    17 518 ops/s, ±1.13%      | 98.89% slower

  jmespath:
    685 479 ops/s, ±0.36%     | 56.61% slower

  @metrichor/jmespath:
    857 740 ops/s, ±0.23%     | 45.7% slower

  @metrichor/jmespath-compiled:
    1 579 693 ops/s, ±0.44%   | fastest

Finished 7 cases!
  Fastest: @metrichor/jmespath-compiled
  Slowest: jsonpath-wasm
```

## Contributions
This benchmark is far from complete. Any contributions are warmly welcomed. We particularly look forward to either missing libraries or more diverse benchmark suites. Please submit a PR request and I will take a look at merging it.

## Credits
&copy; Lei Nelissen 2021