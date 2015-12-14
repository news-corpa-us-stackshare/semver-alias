'use strict';

var expect      = require('chai').expect,
    semver      = require('semver'),
    semverAlias = require('../lib/semver-alias');

describe('semver-alias', function() {

    var nodeVersions = ['v5.2.0', 'v5.0.0', 'v4.0.0', 'v0.10.38'].reverse(),
        superheroes  = require('superheroes').all;

    describe('functional', function() {

        it('correctly aliases a version', function () {
            var getAlias = semverAlias({
                    versions: nodeVersions,
                    aliases : superheroes
                }),
                alias = getAlias('v5.2.0');
            expect(
                alias,
                'v5.2.0 alias is buttercup'
            ).to.equal('aaron-stack');
        });

        it('correctly finds version from alias', function () {
            var getAlias = semverAlias({
                    versions : nodeVersions,
                    aliases  : superheroes
                }),
                alias = getAlias('aaron-stack');
            expect(
                alias,
                'buttercup is a alias of v5.2.0'
            ).to.equal('v5.2.0');
        });

        describe('options.sort', function() {

            it('finds version from alias when using semver.compare', function () {
                var getAlias = semverAlias({
                        versions : nodeVersions,
                        aliases  : superheroes,
                        sort     : semver.compare
                    }),
                    alias = getAlias('aaron-stack');
                expect(
                    alias,
                    'aaron-stack is a alias of v5.2.0'
                ).to.equal('v5.2.0');
            });

            it('finds version from alias when using semver.rcompare', function () {
                var getAlias = semverAlias({
                        versions : nodeVersions,
                        aliases  : superheroes,
                        sort     : semver.rcompare
                    }),
                    alias = getAlias('aaron-stack');
                expect(
                    alias,
                    'aaron-stack is a alias of v0.10.38'
                ).to.equal('v0.10.38');
            });

        });

    });

});
