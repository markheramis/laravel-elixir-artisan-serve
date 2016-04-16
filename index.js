/**
 * laravel-elixir-artisan-serve
 *
 * Author: Kevin Gravier <kevin@mrkmg.com>
 * License: MIT
 */


var ChildProcess = require('child_process');

var Elixir = require('laravel-elixir');
var Extend = require('extend');
var Chalk = require('chalk');

Elixir.extend("artisanServe", function (options)
{
    var runner_arguments, runner;

    // apply options to defaults
    options = Extend({
        'php_path': '/usr/bin/php',
        'artisan_path': './artisan',
        'host': '127.0.0.1',
        'port': 8000,
        'show_requests': true
    }, options);

    // artisanServe will only run during `gulp watch`.
    if (process.argv.slice(2).indexOf('watch') > -1)
    {
        runner_arguments = [
            options.artisan_path,
            'serve',
            '--host', options.host,
            '--port', options.port
        ];

        // Spawn the PHP process with artisan and the options to serve
        runner = ChildProcess.spawn(options.php_path, runner_arguments);

        // Redirect stdout from artisan with tag
        runner.stdout.on('data', function (data)
        {
            process.stdout.write(Chalk.blue('[artisanServe]') + " " + data);
        });

        // Artisan serve outputs requests on stderr, so redirect those if wanted
        if (options.show_requests)
        {
            runner.stderr.on('data', function (data)
            {
                process.stdout.write(Chalk.blue('[artisanServe]') + " " + data);
            });
        }
    }

    // Dummy Task
    new Elixir.Task('artisanServe', function ()
    {
    });
});