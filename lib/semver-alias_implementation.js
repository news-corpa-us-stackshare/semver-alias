'use strict';

/**
 * @function implementation
 * Factory for creating a implementation resolver
 *
 * @param   {semver}    semver      semver helper functions
 *
 * @returns {Function}
 */

module.exports = function implementation() {

    /**
     * @function semverAlias
     * Setup a semverAlias helper function
     *
     * @param   {Object}   options       options for semver-alias
     *
     * @returns {Function}
     */

    var self = function semverAlias(options) {

        options = options || {};

        if (!Array.isArray(options.versions)) {
            throw new Error('semver-alias: an array of versions is required');
        }

        if (!Array.isArray(options.aliases)) {
            throw new Error('semver-alias: an array of aliases is required');
        }

        var versions    = options.versions,
            aliases     = options.aliases,
            lookup      = options.sort ? versions.sort(options.sort) : versions,

            aliasLength = aliases.length,
            increment   = 0,
            index       = 0;

        lookup = lookup.reduce(function(acc, version) {

            var alias = aliases[index]
                            .replace(/\s+/g, '-')
                            .toLowerCase();

            alias = increment > 0 ? increment + '-' + alias : alias;

            // allow both alias and version to be available

            acc[version] = alias;
            acc[alias]   = version;

            index = (index + 1) % aliasLength;

            if (index === 0) { increment++; }

            return acc;

        }, {});

         /**
          * @function getAlias
          * Given a value return it's alias
          *
          * @param   {String}   version     the version to lookup;
          *
          * @returns {String}
          */

        return function getAlias(version) {
            return lookup[version] || 'unknown';
        };

    };

    return self;

};
