// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'development';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: './src/index.js',
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    // },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
        clean: true,
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: 'index.html',
        // }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new CopyWebpackPlugin({
            patterns: [
                // copies all assets in the lib/ folder (images, etc) to /build (in case not imported manually via SCSS or CSS or JS). Any images referenced in SASS or CSS via url() or imported directly with js will be copied over automatically to /build root and given distinct filename - a little redundant :(
                {from:'lib/', to:'', noErrorOnMissing: true},
                // // copies HTML file to /build
                {from:'./html/index.html', to:'index.html'},
                {from:'./html/error.html', to:'error.html'},
            ]
        }),
    ],
    devServer: {
        // open: true,
        // host: 'localhost',
        // static: {
        //     directory: path.join(__dirname, 'build'),
        // },
        devMiddleware: {
            publicPath: '/',
            writeToDisk: true,
        },
        onAfterSetupMiddleware: function (devServer) {
            const app = devServer.app;
            app.get('/', function (req, res) {
              res.sendFile(path.join(__dirname, 'build/index.html'));
            });
            // ... more routes
            app.get('*', function (req, res) {
                res.sendFile(path.join(__dirname, 'build/error.html'));
            });
          },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader', 'scss-loader'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
