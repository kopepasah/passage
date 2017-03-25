#! /usr/bin/env node
var path  = require( 'path' );
var grunt = require( 'grunt' );
var conf  = require( 'config-file' );
var chalk = require( 'chalk' );

module.exports = {
	set : {
		args : function() {
			var args = {};

			process.argv.forEach( ( val, index ) => {
				var arg = val.match( /^--[a-z]+=/g );

				if ( arg ) {
					arg = arg.shift();
					args[ arg.replace( '--', '' ).replace( '=', '' ) ] = val.replace( arg, '' );
				}
			});

			return args;
		},

		option : function( command ) {
			var options = {}, args = command.match( /\w+:\w+/g );

			if ( args ) {
				for ( index in args ) {
					var option = args[ index ].split( ':' );

					options[ option[0] ] = option[1];
				}
			}

			return options;
		},

		/**
		 * Checks if target is defined or machine exists. If not defined and
		 * machine does not exist, throws and error.
		 */
		vagrant : function( target ) {
			var machine, machines = conf( 'machines.json' );

			if ( target && machines ) {
				if ( machines.hasOwnProperty( target ) ) {
					machine = machines[ target ];
				} else {
					console.error(
						chalk.red( 'Error:' ),
						'Target not found in machine.json:',
						chalk.blue( target )
					);
					process.exit( 1 ) ;
				}
			} else if ( machines ) {
				for ( index in machines ) {
					machine = machines[ index ];
					break;
				}
			} else {
				console.error(
					chalk.red( 'Error:' ),
					'No target option set and machines.json file does not exist.'
				);
				process.exit( 1 ) ;
			}

			if ( ! grunt.file.exists( path.join( machine, 'Vagrantfile' ) ) ) {
				console.error(
					chalk.red( '[Error]:' ),
					'Vagrantfile does not exist in target location:',
					chalk.blue( machine )
				);
				process.exit( 1 );
			}

			return machine;
		},

		/**
		 * Checks if the vvv-config.yml file exists and loads an object. If
		 * files does not exist, throws and error and exits the process.
		 */
		sites : function( machine ) {
			var sites = {};

			if ( grunt.file.exists( path.join( machine, 'vvv-config.yml' ) ) ) {
				if ( grunt.file.exists( path.join( machine, 'vvv-custom.yml' ) ) ) {
					config = conf( path.join( machine, 'vvv-custom.yml' ) );
				} else {
					config = conf( path.join( machine, 'vvv-config.yml' ) );
				}

				return config.sites;
			} else {
				console.error(
					chalk.red( '[Error]:' ),
					'vvv-config.yml file does not exist. (Required with VVV version 2.0.0).',
					chalk.yellow( path.join( data.machine, 'vvv-config.yml' ) )
				);
				process.exit( 1 );
			}
		},

		site : function( args, options, sites ) {
			var site;

			if ( 'undefined' !== typeof options.site && sites.hasOwnProperty( options.site ) ) {
				site = sites[ options.site ].vm_dir;
			} else {
				for ( key in sites ) {
					if ( 'undefined' !== sites[ key ].local_dir && sites[ key ].local_dir === args.directory ) {
						site = sites[ key ].vm_dir
					}
				}
			}

			if ( 'undefined' === typeof site ) {
				console.error(
					chalk.red( '[Error]:' ),
					'Target site not defined and not in current directory of a site.'
				);
				process.exit( 1 );
			}

			return site;
		}
	},

	trim : {
		command : function( command ) {
			var args = command.match( /\w+:\w+/g );

			if ( args ) {
				for ( index in args ) {
					command = command.replace( args[ index ], '' );
				}
			}

			return command.trim();
		}
	},
}
