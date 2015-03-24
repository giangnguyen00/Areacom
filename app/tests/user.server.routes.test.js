'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Customer = mongoose.model('Customer'),
    agent = request.agent(app);

/**
* Globals
*/
var credentials, user, customer;

/**
* Customer routes tests
*/
describe('User CRUD tests', function() {
    beforeEach(function(done) {
        // Create user credentials
        credentials = {
            username: 'username',
            password: 'password'
        };

        // Create a new user
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        });

        // Save a user to the test db and create new Customer
        user.save(function() {
            customer = {
                lastName: 'Customer Name',
                email: 'sdk@gmail.com',
                username: 'hello',
                password: 'hello12344'
            };

            done();
        });
    });

    it('should be able to save user instance if logged in (only admin can work with users)', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new Customer
                agent.post('/customers')
                    .send(customer)
                    .expect(200)
                    .end(function(customerSaveErr, customerSaveRes) {
                        // Handle Customer save error
                        if (customerSaveErr) done(customerSaveErr);

                        // Get a list of Customers
                        agent.get('/customers')
                            .end(function(customersGetErr, customersGetRes) {
                                // Handle Customer save error
                                if (customersGetErr) done(customersGetErr);

                                // Get Customers list
                                var customers = customersGetRes.body;

                                // Set assertions
                                //(customers[0].user._id).should.equal(userId);
                                (customers[0].lastName).should.match('Customer Name');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to save user instance if not logged in', function(done) {
        agent.post('/customers')
            .send(customer)
            .expect(200)
            .end(function(customerSaveErr, customerSaveRes) {
                // Call the assertion callback
                done(customerSaveErr);
            });
    });

    it('should not be able to save user instance if no name is provided', function(done) {
        // Invalidate name field
        customer.lastName = '';

        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new Customer
                agent.post('/customers')
                    .send(customer)
                    .expect(400)
                    .end(function(customerSaveErr, customerSaveRes) {
                        // Set message assertion
                        (customerSaveRes.body.message).should.match('Please fill Customer last name');

                        // Handle Customer save error
                        done(customerSaveErr);
                    });
            });
    });

    it('should be able to update user instance if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new Customer
                agent.post('/customers')
                    .send(customer)
                    .expect(200)
                    .end(function(customerSaveErr, customerSaveRes) {
                        // Handle Customer save error
                        if (customerSaveErr) done(customerSaveErr);

                        // Update Customer name
                        customer.lastName = 'WHY YOU GOTTA BE SO MEAN?';

                        // Update existing Customer
                        agent.put('/customers/' + customerSaveRes.body._id)
                            .send(customer)
                            .expect(200)
                            .end(function(customerUpdateErr, customerUpdateRes) {
                                // Handle Customer update error
                                if (customerUpdateErr) done(customerUpdateErr);

                                // Set assertions
                                (customerUpdateRes.body._id).should.equal(customerSaveRes.body._id);
                                (customerUpdateRes.body.lastName).should.match('WHY YOU GOTTA BE SO MEAN?');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of users if not signed in', function(done) {
        // Create new Customer model instance
        var customerObj = new Customer(customer);

        // Save the Customer
        customerObj.save(function() {
            // Request Customers
            request(app).get('/customers')
                .end(function(req, res) {
                    // Set assertion
                    res.body.should.be.an.Array.with.lengthOf(1);

                    // Call the assertion callback
                    done();
                });

        });
    });


    it('should be able to get a single user if not signed in', function(done) {
        // Create new Customer model instance
        var customerObj = new Customer(customer);

        // Save the Customer
        customerObj.save(function() {
            request(app).get('/customers/' + customerObj._id)
                .end(function(req, res) {
                    // Set assertion
                    res.body.should.be.an.Object.with.property('lastName', customer.lastName);

                    // Call the assertion callback
                    done();
                });
        });
    });

    it('should be able to delete user instance if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new Customer
                agent.post('/customers')
                    .send(customer)
                    .expect(200)
                    .end(function(customerSaveErr, customerSaveRes) {
                        // Handle Customer save error
                        if (customerSaveErr) done(customerSaveErr);

                        // Delete existing Customer
                        agent.delete('/customers/' + customerSaveRes.body._id)
                            .send(customer)
                            .expect(200)
                            .end(function(customerDeleteErr, customerDeleteRes) {
                                // Handle Customer error error
                                if (customerDeleteErr) done(customerDeleteErr);

                                // Set assertions
                                (customerDeleteRes.body._id).should.equal(customerSaveRes.body._id);

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to delete user instance if not signed in', function(done) {
        // Set Customer user
        customer.user = user;

        // Create new Customer model instance
        var customerObj = new Customer(customer);

        // Save the Customer
        customerObj.save(function() {
            // Try deleting Customer
            request(app).delete('/customers/' + customerObj._id)
                .expect(401)
                .end(function(customerDeleteErr, customerDeleteRes) {
                    // Set message assertion
                    (customerDeleteRes.body.message).should.match('User is not logged in');

                    // Handle Customer error error
                    done(customerDeleteErr);
                });

        });
    });

    afterEach(function(done) {
        //User.remove().exec();
        Customer.remove().exec();
        done();
    });
});