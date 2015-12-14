'use strict';

var expect         = require('chai').expect,
    implementation = require('implementation')('../lib/semver-alias');

describe('semver-alias', function() {

    describe('unit', function() {

        it('is a function', function() {
            var semverAlias = implementation();
            expect(semverAlias, 'is a valid function').to.be.a('function');
            expect(semverAlias.length, 'has an arity of 1').to.equal(1);
        });

        describe('errors', function() {

            it('if no versions are supplied', function() {
                expect(
                    implementation(),
                    'throws an error is no versions are supplied'
                ).to.throw(/semver-alias: an array of versions is required/);
            });

            it('if no aliases are supplied', function() {
                expect(
                    implementation().bind(null, { versions: [] }),
                    'throws an error is no aliases are supplied'
                ).to.throw(/semver-alias: an array of aliases is required/);
            });

        });

        it('calls options.sort when specified', function() {
            var called      = false,
                versions    = ['0.1.0', '0.2.0', '5.0.1'],
                semverAlias = implementation();
            semverAlias({
                versions: versions,
                aliases : ['foo'],
                sort    : function() {
                    called = true;
                }
            });
            expect(called, 'options.sort called').to.equal(true);
        });

        describe('=> getAlias', function() {

            it('is a function', function() {
                var semverAlias = implementation(),
                    result      = semverAlias({
                        versions : [],
                        aliases  : []
                    });
                expect(result, 'is a valid function').to.be.a('function');
                expect(result.length, 'has an arity of 1').to.equal(1);
            });

            it('reuses aliases if not enough available', function() {
                var semverAlias = implementation(),
                    getAlias    = semverAlias({
                        versions : ['2.0.0', '2.1.0'],
                        aliases  : ['Optimus Prime']
                    });
                expect(getAlias('2.1.0'), 'correctly reuses alias').to.equal('1-optimus-prime');
            });

            it('returns "unknown" if alias not found', function() {
                var semverAlias = implementation(),
                    getAlias    = semverAlias({
                        versions : ['2.0.0', '2.1.0'],
                        aliases  : ['Optimus Prime', 'Megatron']
                    });
                expect(getAlias('3.1.0'), 'correctly returns unknown').to.equal('unknown');
            });

            it('returns alias for known version', function() {
                var semverAlias = implementation(),
                    getAlias    = semverAlias({
                        versions : ['2.0.0', '2.1.0'],
                        aliases  : ['Optimus Prime', 'Megatron']
                    });
                expect(getAlias('2.1.0'), 'correctly returns known alias').to.equal('megatron');
            });

            it('returns version for known alias', function() {
                var semverAlias = implementation(),
                    getAlias    = semverAlias({
                        versions : ['2.0.0', '2.1.0'],
                        aliases  : ['Optimus Prime', 'Megatron']
                    });
                expect(getAlias('megatron'), 'correctly returns version').to.equal('2.1.0');
            });

            it('returns a lowercase alias without spaces', function() {
                var semverAlias = implementation(),
                    getAlias    = semverAlias({
                        versions : ['2.0.0', '2.1.0'],
                        aliases  : ['Optimus Prime', 'Megatron']
                    });
                expect(getAlias('2.0.0'), 'correctly returns normalised alias').to.equal('optimus-prime');
            });

        });

    });

});
