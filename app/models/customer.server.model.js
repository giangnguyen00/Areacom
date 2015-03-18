'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		//required: 'Please fill Customer name',
		trim: true
	},
    lastName: {
        type: String,
        default: '',
        required: 'Please fill Customer last name',
        trim: true
    },
    email: {
        type: String,
        default: '',
        required: 'Please fill Customer email',
        trim: true
    },
    username: {
        type: String,
        default: '',
        required: 'Please fill Customer user name',
        trim: true
    },
    password: {
        type: String,
        default: '',
        required: 'Please fill Customer password name',
        trim: true
    },

    //roles: {
    //    type: [{
    //        type: String,
    //        enum: ['user', 'admin']
    //    }],
    //    default: ['user']
    //},

	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Customer', CustomerSchema);