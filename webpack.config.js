// webpack uses Node.js to build our application, so we can use npm modules and the require module
const path = require("path");

// require because plugin is built into webpack, and need to ensure we're req webpack's methods and properties into this file  
const webpack = require("webpack");

// For a basic configuration, we need to provide webpack with three properties: entry, output, and mode
module.exports = {

    // The first thing we want to declare is the entry property. The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
    // webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder that we specify
    // The final piece of our basic setup will provide the mode in which we want webpack to run. By default, webpack wants to run in production mode
    // We're going to use the providePlugin plugin to define the $ and jQuery variables to use the installed npm jquery package. If we did not do this, the code would still not work even though we installed jQuery
    entry: './assets/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    mode: 'development'
};

// Because Bootstrap doesn't have any special variables that webpack doesn't understand, the only thing we need to do is require the package at the top of the script.js file
// require("bootstrap");

