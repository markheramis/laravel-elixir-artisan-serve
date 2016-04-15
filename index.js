var ChildProcess = require('child_process');

var elixir = require('laravel-elixir');
var Extend = require('extend');
var GulpUtil = require('gulp-util');
var Chalk = require('chalk');

elixir.extend("artisanServe", function (options)
{
    options = Extend({
        'php_path': '/usr/bin/php',
        'artisan_path': './artisan',
        'host': '127.0.0.1',
        'port': 8000,
        'show_requests': true
    }, options);

    // artisanServe will only run during `gulp watch`.
    if (GulpUtil.env._.indexOf('watch') > -1)
    {
        var runner = ChildProcess.spawn(options.php_path, [options.artisan_path, 'serve', '--host', options.host, '--port', options.port]);

        runner.stdout.on('data', function (data)
        {
            process.stdout.write(Chalk.blue('[artisanServe]') + " " + data);
        });

        if (options.show_requests)
        {
            runner.stderr.on('data', function (data)
            {
                process.stderr.write(Chalk.blue('[artisanServe]') + " " + data);
            });
        }

    }

    // Dummy Task
    new elixir.Task('artisanServe', function ()
    {
    });
});