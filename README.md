# JSON Selector Benchmark 🚀
This repository benchmarks various ways of retrieving data from a JSON object using a string-based JSON selector. It benchmarks the libraries against a couple of test suites, each emphasizing simpler or more complex cases of usage. In cases where selectors can be pre-compiled, they are included as a seperate suite case, affixed with `-compiled`.

These JSON Selectors are currently evaluated in NodeJS, but should be applicable in the browser as well.

### What is a JSON Selector?
I see a JSON selector as a string (e.g. `foo.bar[].value`) that can be applied to a Javascript object / JSON file (e.g. `{ foo: { bar: [{ value: 1, value 2 }] } }`) such that the result (e.g. `[1, 2]`) is a subset of the latter based on a filter using the former. 

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
* [object-scan](https://github.com/blackflux/object-scan)

## Results
*All suites are run against a 2021 Macbook Pro (M1 Max, 16GB RAM, NodeJS v16.13.1)*

* [simple](./benchmark/results/simple.chart.html)
```
Running "simple" suite...
Progress: 100%

  _.get:
    35 170 487 ops/s, ±0.14%   | 39.77% slower

  @gizt/selector:
    6 341 344 ops/s, ±0.41%    | 89.14% slower

  jsonpath:
    364 589 ops/s, ±0.42%      | 99.38% slower

  jsonpath-wasm:
    282 525 ops/s, ±1.79%      | 99.52% slower

  jsonpath-wasm-compiled:
    366 762 ops/s, ±1.86%      | 99.37% slower

  jmespath:
    2 903 565 ops/s, ±1.71%    | 95.03% slower

  @metrichor/jmespath:
    10 371 922 ops/s, ±0.41%   | 82.24% slower

  @metrichor/jmespath-compiled:
    58 398 083 ops/s, ±0.63%   | fastest

  object-scan:
    281 257 ops/s, ±1.76%      | slowest, 99.52% slower

Finished 9 cases!
  Fastest: @metrichor/jmespath-compiled
  Slowest: object-scan
```

* [double-nested-first](./benchmark/results/double-nested-first.chart.html)
```
Running "double-nested-first" suite...
Progress: 100%

  _.get:
    5 788 891 ops/s, ±0.42%   | fastest

  @gizt/selector:
    783 089 ops/s, ±0.45%     | 86.47% slower

  jsonpath:
    71 759 ops/s, ±0.41%      | 98.76% slower

  jsonpath-wasm:
    24 138 ops/s, ±1.06%      | 99.58% slower

  jsonpath-wasm-compiled:
    13 378 ops/s, ±6.51%      | slowest, 99.77% slower

  jmespath:
    981 244 ops/s, ±0.52%     | 83.05% slower

  @metrichor/jmespath:
    1 281 678 ops/s, ±0.46%   | 77.86% slower

  @metrichor/jmespath-compiled:
    1 573 679 ops/s, ±0.71%   | 72.82% slower

  object-scan:
    215 537 ops/s, ±0.95%     | 96.28% slower

Finished 9 cases!
  Fastest: _.get
  Slowest: jsonpath-wasm-compiled
```

* [doubled-nested-all](./benchmark/results/double-nested-all.chart.html)
```
Running "double-nested-all" suite...
Progress: 100%

  @gizt/selector:
    500 134 ops/s, ±0.52%     | 68.56% slower

  jsonpath:
    49 929 ops/s, ±0.58%      | 96.86% slower

  jsonpath-wasm:
    15 520 ops/s, ±1.78%      | slowest, 99.02% slower

  jsonpath-wasm-compiled:
    19 282 ops/s, ±1.32%      | 98.79% slower

  jmespath:
    702 235 ops/s, ±0.74%     | 55.86% slower

  @metrichor/jmespath:
    837 498 ops/s, ±1.69%     | 47.35% slower

  @metrichor/jmespath-compiled:
    1 590 786 ops/s, ±0.65%   | fastest

  object-scan:
    260 616 ops/s, ±0.92%     | 83.62% slower

Finished 8 cases!
  Fastest: @metrichor/jmespath-compiled
  Slowest: jsonpath-wasm
```

## Contributions
This benchmark is far from complete. Any contributions are warmly welcomed. We particularly look forward to either missing libraries or more diverse benchmark suites. Please submit a PR request and I will take a look at merging it.

## Credits
&copy; Lei Nelissen 2022