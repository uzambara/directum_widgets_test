var path = require("path");

module.exports = function(env, args) {
    return {
        entry: ["./src/index.tsx"],
        output: {
            path: path.resolve(__dirname, "./build"),
            filename: "bundle.js",
            publicPath: args.mode === "production" ? "/widgets/" : ""
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: "/node_modules/",
                    use: "ts-loader"
                },
                {
                    test: /\.js(x?)$/,
                    exclude: "/node_modules/",
                    use: "babel-loader"
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader",
                            options: {
                                localsConvention: 'camelCase',
                                modules: {
                                    mode: "local",
                                    localIdentName: "[local]--[hash:base64:5]"
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                            options: {
                                localsConvention: 'camelCase',
                                modules: {
                                    mode: "local",
                                    localIdentName: "[local]--[hash:base64:5]"
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                data: '@import "./src/constants.scss";',
                                includePaths:[__dirname, 'src']
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "/images/"
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: '/fonts/'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        devtool: "eval-sourcemap",
        devServer: {
            compress: true,
            contentBase: path.resolve(__dirname, "build"),
            historyApiFallback: true
        }
    }
};