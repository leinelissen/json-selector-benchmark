import b from 'benny';

/**
 * Import libraries
 */

import { get as lodashGet } from 'lodash-es';
import jsonPath from 'jsonpath';
import jsonPathWasm from 'jsonpath-wasm';
import gizt from '@gizt/selector';
import jq from 'node-jq';
import jmesPath from 'jmespath';
import jmesPathTs from '@metrichor/jmespath';
import objectScan from 'object-scan';

/**
 * Import example JSON
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const simple = require('./data/simple.json');
const doubleNested = require('./data/double-nested.json');

/**
 * Define pre-compiled selectors where applicable
 */

// @mtrichor/jmespath
const jmesTsSimple = jmesPathTs.compile('foo');
const jmesTsDoubleNested = jmesPathTs.compile('relationships_followers[].string_list_data[].value');

//

/**
 * Define rouns and library implementations
 */

const suites = [
    {
        name: 'simple',
        data: simple,
        libraries: {
            '_.get': (data) => lodashGet(data, 'foo'),
            '@gizt/selector': (data) => gizt('foo', data),
            'jsonpath': (data) => jsonPath.query(data, '$.foo'),
            'jsonpath-wasm': (data) => jsonPathWasm.select(data, '$.foo'),
            'jsonpath-wasm-compiled': jsonPathWasm.compile('$.foo'),
            // 'node-jq': (data) => jq.run('.foo', data, { input: 'json' }),
            'jmespath': (data) => jmesPath.search(data, 'foo'),
            '@metrichor/jmespath': (data) => jmesPathTs.search(data, 'foo'),
            '@metrichor/jmespath-compiled': (data) => jmesPathTs.TreeInterpreter.search(jmesTsSimple, data),
            'object-scan': objectScan(['foo']),
        },
    },
    {
        name: 'double-nested-first',
        data: doubleNested,
        libraries: {
            '_.get': (data) => lodashGet(data, 'relationships_followers[0].string_list_data[0].value'),
            '@gizt/selector': (data) => gizt('relationships_followers[0].string_list_data[0].value', data),
            'jsonpath': (data) => jsonPath.query(data, '$.relationships_followers[0].string_list_data[0].value'),
            'jsonpath-wasm': (data) => jsonPathWasm.select(data, '$.relationships_followers[0].string_list_data[0].value'),
            'jsonpath-wasm-compiled': jsonPathWasm.compile('$.relationships_followers[0].string_list_data[0].value'),
            // 'node-jq': (data) => jq.run('.relationships_followers[0].string_list_data[0].value', data, { input: 'json' }),
            'jmespath': (data) => jmesPath.search(data, 'relationships_followers[0].string_list_data[0].value'),
            '@metrichor/jmespath': (data) => jmesPathTs.search(data, 'relationships_followers[0].string_list_data[0].value'),
            '@metrichor/jmespath-compiled': (data) => jmesPathTs.TreeInterpreter.search(jmesTsDoubleNested, data),
            'object-scan': objectScan(['relationships_followers[0].string_list_data[0].value'])
        }
    },
    {
        name: 'double-nested-all',
        data: doubleNested,
        libraries: {
            // Lodash has no way of implementing this
            // '_.get': (data) => lodashGet(data, 'relationships_followers[0].string_list_data[0].value'),
            '@gizt/selector': (data) => gizt('relationships_followers[].string_list_data[].value', data),
            'jsonpath': (data) => jsonPath.query(data, '$.relationships_followers[*].string_list_data[*].value'),
            'jsonpath-wasm': (data) => jsonPathWasm.select(data, '$.relationships_followers[*].string_list_data[*].value'),
            'jsonpath-wasm-compiled': jsonPathWasm.compile('$.relationships_followers[*].string_list_data[*].value'),
            // 'node-jq': (data) => jq.run('.relationships_followers[].string_list_data[].value', data, { input: 'json' }),
            'jmespath': (data) => jmesPath.search(data, 'relationships_followers[].string_list_data[].value'),
            '@metrichor/jmespath': (data) => jmesPathTs.search(data, 'relationships_followers[].string_list_data[].value'),
            '@metrichor/jmespath-compiled': (data) => jmesPathTs.TreeInterpreter.search(jmesTsDoubleNested, data),
            'object-scan': objectScan(['relationships_followers.*.string_list_data.*.value']),
        }
    },
]

// Loop through the varying suites of benchmarks
suites.forEach(async (suite) => {
    await b.suite(
        suite.name, 
        // Then loop through the individual libraries
        ...Object.keys(suite.libraries).flatMap((key) => {
            // Start a bench suite for this matrix combination
            return b.add(
                key,
                () => suite.libraries[key](suite.data),
            );
        }),
        b.cycle(),
        b.complete(),
        b.save({ file: suite.name, format: 'chart.html' }),
        b.save({ file: suite.name, format: 'table.html' }),
        b.save({ file: suite.name, format: 'csv' }),
    );
});