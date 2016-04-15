Laravel Elixir Artisan Serve
============================

Current Version: 1.0.2

A simple Elixir Mix to run artisan serve.

    var elixir = require('laravel-elixir');

    require('laravel-elixir-artisan-serve');

    elixir(function (mix) {
        mix.artisanServe();
    });

The mix will only run if gulp is run with watch. This was created to simplify local development utilizing browserSync.

How to Install
--------------

    npm install --save laravel-elixir artisan serve

Full Featured Example
---------------------

Example with all *(default)* options and browserSync:

    var elixir = require('laravel-elixir');

    require('laravel-elixir-artisan-serve');

    elixir(function (mix) {
        mix
            .artisanServe({
                php_path: '/usr/bin/php', // Path to PHP
                artisan_path: './artisan', // Relative path from gulpfile to the artisan file
                host: '127.0.0.1', // Host to pass to artisan serve
                port: 8000, // Port to pass to artisan serve
                show_requests: true // Show requests in the output
            })
            .browserSync({
                proxy: '127.0.0.1:8000',
                files: [
                    "public/**/*.css",
                    "public/**/*.js"
                ]
            });
    });

Then run `gulp watch`

License: MIT