#! /usr/bin/env node

/**
 * Entry for Passage.
 *
 * @package Passage
 * @author XWP, Justin Kopepasah
 */

var tools = require( './scripts/tools.js' );
var passage = {
	args    : tools.set.args(),
	options : {
		target : null,
	},
	door : null,
	code : null,
};

// Sets the options and trims the command.
passage.options = tools.set.option( passage.args.command );
passage.args.command = tools.trim.command( passage.args.command );

// Sets the target Vagrant.
passage.options.target = tools.set.vagrant( passage.options.target );

// Sets the available sites.
passage.sites = tools.set.sites( passage.options.target );

// Sets the target site for the Vagrant command.
passage.site = tools.set.site( passage.args, passage.options, passage.sites );

// Sets the door and key.
passage.door = passage.options.target;
passage.code = 'cd ' + passage.site + '; ' + passage.args.command;

module.exports = passage;
