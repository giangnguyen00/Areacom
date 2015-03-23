'use strict';

/**
* Module dependencies.
*/
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Contract = mongoose.model('Contract');

/**
* Globals
*/
var user, contract;

/**
* Unit tests
*/
describe('Contract Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			contract = new Contract({
				name: 'Contract Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		//it('should be able to save without problems', function(done) {
		//	return contract.save(function(err) {
		//		should.not.exist(err);
		//		done();
		//	});
		//});

		it('should be able to show an error when try to save without name', function(done) {
			contract.name = '';

			return contract.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should be able to show an error when try to save without Tower Cloud Site ID', function(done) {
            contract.tcsiteID = '';

            return contract.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without Tower Owner Site ID', function(done) {
            contract.tositeID = '';

            return contract.save(function(err) {
                should.exist(err);
                done();
            });
        });
	});

	//afterEach(function(done) {
	//	Contract.remove().exec();
	//	User.remove().exec();
    //
	//	done();
	//});
});