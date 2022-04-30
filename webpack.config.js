// webpack uses Node.js to build our application, so we can use npm modules and the require module
const path = require("path");

// require because plugin is built into webpack, and need to ensure we're req webpack's methods and properties into this file  
const webpack = require("webpack");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// For a basic configuration, we need to provide webpack with three properties: entry, output, and mode
module.exports = {

    // The first thing we want to declare is the entry property. The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
    // webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder that we specify
    // The final piece of our basic setup will provide the mode in which we want webpack to run. By default, webpack wants to run in production mode
    // We're going to use the providePlugin plugin to define the $ and jQuery variables to use the installed npm jquery package. If we did not do this, the code would still not work even though we installed jQuery
    entry: { // each file name will be the name of the entry point we provide
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: { // each output file will have it's own bundle
        filename: "[name].bundle.js", 
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        // This object will identify the type of files to pre-process using the test property to find a regex
        rules: [
          {
            test: /\.jpg$/i, 
            use: [
                {
                    loader: 'file-loader',
                    options: { 
                        // options object that contains a name function, which returns the name of the file with the file extension
                        esModule: false,
                        name (file) {
                            return "[path][name].[ext]"
                        },
                        // publicPath property, which is also a function that changes our assignment URL by replacing the ../ from our require() statement with /assets/ --> so creates assets folder
                        publicPath: function(url) {
                            return url.replace("../", "/assets/")
                        }
                    }
                },
                {
                  loader: 'image-webpack-loader'
                }
            ]
          }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        })
        // we added the BundleAnalyzerPlugin, we configured the analyzerMode property with a static value. This will output an HTML file called report.html that will generate in the dist folder.
    ],
    mode: 'development'
};

// Because Bootstrap doesn't have any special variables that webpack doesn't understand, the only thing we need to do is require the package at the top of the script.js file
// require("bootstrap");

