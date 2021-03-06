/*jshint expr: true*/
/*jshint -W079 */ //redefined expect
var expect = require('chai').expect;

describe('Mockgoose $gte Tests', function () {
    'use strict';

    var mockgoose = require('./../../../Mockgoose');
    var Mongoose = require('mongoose').Mongoose;
    var mongoose = new Mongoose();
    mockgoose(mongoose);
    mongoose.connect('mongodb://localhost/TestingDB');

    var Schema = new mongoose.Schema({
        code: String,
        tags: [
            {type: String}
        ],
        qty: [
            {
                size: String,
                num: Number,
                color: String
            }
        ]
    });
    var Model = mongoose.model('AllTests', Schema);

    beforeEach(function (done) {
        mockgoose.reset();
        Model.create({
                code: 'xyz',
                tags: [ 'school', 'book', 'bag', 'headphone', 'appliance' ],
                qty: [
                    { size: 'S', num: 10, color: 'blue' },
                    { size: 'M', num: 45, color: 'blue' },
                    { size: 'L', num: 100, color: 'green' }
                ]
            },
            {
                code: 'abc',
                tags: [ 'appliance', 'school', 'book' ],
                qty: [
                    { size: '6', num: 100, color: 'green' },
                    { size: '6', num: 50, color: 'blue' },
                    { size: '8', num: 120, color: 'brown' }
                ]
            },
            {
                code: 'efg',
                tags: [ 'school', 'book' ],
                qty: [
                    { size: 'S', num: 10, color: 'blue' },
                    { size: 'M', num: 100, color: 'blue' },
                    { size: 'L', num: 120, color: 'green' }
                ]
            },
            {
                code: 'ijk',
                tags: [ 'electronics', 'school' ],
                qty: [
                    { size: 'M', num: 30, color: 'green' }
                ]
            }, function (err) {
                done(err);
            });
    });

    afterEach(function (done) {
        //Reset the database after every test.
        mockgoose.reset();
        done();
    });

    describe('$gte Tests', function () {

        it('Be able to match values $gte', function (done) {
            Model.find({
                qty: { num: { $gte: 120 } }
            }).exec().then(function (results) {
                    expect(results).not.to.be.undefined;
                    expect(results.length).to.equal(2);
                    done();
                }, done);
        });

        it('Not match values $gte the value', function (done) {
            Model.find({ qty: { num: { $gte: 500 } }
            }).exec().then(function (results) {
                    expect(results).not.to.be.undefined;
                    expect(results.length).to.equal(0);
                    done();
                }, done);
        });
    });
});
