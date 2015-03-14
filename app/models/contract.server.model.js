'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contract Schema
 */
var ContractSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Contract name',
		trim: true
	},

	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	StartDate: {
		type: Date,
		default: ''	
	},
	tcsiteID: {
		type: String,
		default: '',
		required: 'Please add a Tower Cloud Site ID',
		trim: true
	},
	tositeID: {
		type: String,
		default: '',
		required: 'Please add a Tower Owner Site ID',
		trim: true
	},
	towner: {
		type: String,
		default: ''
	},
	pobox: {
		type: String,
		default: ''
	},
	numdish: {
		type: String,
		default: ''
	},
	address: {
		type: String,
		default: ''
	},
	city: {
		type: String,
		default: ''
	},
	state: {
		type: String,
		default: ''
	},
	zip: {
		type: String,
		default: ''
	},
	EndDate: {
		type: Date,
		default: ''
	},
	longit: {
		type: String,
		default: ''
	},
	lat: {
		type: String,
		default: ''
	},
	ntp: {
		type: Boolean,
		default: ''
	},
	towerbool: {
		type: Boolean,
		default : ''
	},
	notes: {
		type: String,
		default : ''
	}
});

mongoose.model('Contract', ContractSchema);