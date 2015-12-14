# semver-alias

Alias semver versions against a set of human readable values. This is intended to enable you to publish the versions of application dependencies without making those versions available to bad actors.

**Note: keep your aliases safe**

## Install

```bash
$ npm install --save semver-alias
```

## Usage

### Default

By default versions are assigned an alias based upon the order supplied.

```
var semverAlias = require('semver-alias'),
    getAlias    = semverAlias({
        versions : ['0.10.38', '4.0.0', '5.0.0'],
        aliases  : ['Optimus Prime', 'Bumblebee', 'Megatron']
    });

    getAlias(process.version); // => 'megatron'
    getAlias('megatron');      // => '5.0.0'
```
> Aliasing node version

Note should you not have enough values to alias a version then the list of aliases will be reused and prefixed based upon how many times the list has been iterated over.

```
var semverAlias = require('semver-alias'),
    getAlias    = semverAlias(
        versions : ['0.10.38', '4.0.0', '5.0.0'],
        aliases  : ['Optimus Prime']
    );

    getAlias(process.version);   // => '1-optimus-prime'
    getAlias('1-optimus-prime'); // => '5.0.0'
```
> Re-using aliases

### Sorted

Should you wish to sort your versions prior to being aliased this can be set via the sort option. This function will be used prior to assigning aliases. The example below uses semver.compare to sort versions.

```
var semver      = require('semver'),
    semverAlias = require('semver-alias'),
    getAlias    = semverAlias(
        versions : ['4.0.0', '5.0.0', '0.10.38'],
        aliases  : ['Optimus Prime'],
        sort     : semver.compare
    );

    getAlias(process.version);   // => '1-optimus-prime'
    getAlias('1-optimus-prime'); // => '5.0.0'

```

# Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using ***`npm test`***

# Release History

- **1.0.0** First release candidate

# License
Copyright (c) 2015 News Corp Australia. Licensed under the MIT license.
