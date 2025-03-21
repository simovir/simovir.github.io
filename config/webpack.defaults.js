// This file is created and managed by Bridgetown.
// Instead of editing this file, add your overrides to `webpack.config.js`
//
// To update this file to the latest version provided by Bridgetown,
// run `bridgetown webpack update`. Any changes to this file will be overwritten
// when an update is applied hence we strongly recommend adding overrides to
// `webpack.config.js` instead of editing this file.
//
// Shipped with Bridgetown v1.3.4

const path = require("path");
const rootDir = path.resolve(__dirname, "..")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

// Input and output

const entry = { main: path.resolve(rootDir, "frontend", "javascript", "index.js") }
const output = {
  path: path.resolve(rootDir, "output", "_bridgetown", "static", "js"),
  filename: "[name].[contenthash].js",
  publicPath: "",
}

// Rules and Loaders

const jsRule = {
  test: /\.(js|jsx)$/,
  use: {
    loader: "esbuild-loader",
    options: {
      target: 'es2016'
    },
  },
}

const cssRules = {
  test: /\.(s[ac]|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        url: {
          filter: url => !url.startsWith('/')
        },
        importLoaders: 1
      }
    }
  ],
  mode: 'postcss',

  postcss: () => {
    cssRules.use.push({
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          config: "postcss.config.js"
        }
      }
    })
    return { test: cssRules.test, use: cssRules.use }
  },

  sass: () => {
    cssRules.use.push({
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
        sassOptions: {
          fiber: false,
          includePaths: [
            path.resolve(rootDir, "src/_components")
          ],
        },
      },
    })
    return { test: cssRules.test, use: cssRules.use }
  }
}

const fontsRule = {
  test: /\.woff2?$|\.ttf$|\.eot$/,
  type: "asset/resource",
  generator: {
    filename: "../fonts/[name]-[hash][ext][query]"
  }
}

const imagesRule = {
  test: /\.png?$|\.gif$|\.jpg$|\.svg$/,
  type: "asset/resource",
  generator: {
    filename: "../[path][name]-[hash][ext][query]"
  }
}

// Default configuration object

module.exports = {
  entry: entry,
  devtool: "source-map",
  // Set some or all of these to true if you want more verbose logging:
  stats: {
    modules: false,
    builtAt: false,
    timings: false,
    children: false,
  },
  output: output,
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      path.resolve(rootDir, 'frontend', 'javascript'),
      path.resolve(rootDir, 'frontend', 'styles'),
      path.resolve(rootDir, 'node_modules')
    ],
    alias: {
      bridgetownComponents: path.resolve(rootDir, "src", "_components")
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].[contenthash].css",
    }),
    new WebpackManifestPlugin({
      fileName: path.resolve(rootDir, ".bridgetown-cache", "frontend-bundling", "manifest.json"),
    }),
  ],
  module: {
    rules: [
      jsRule, cssRules[cssRules.mode](), fontsRule, imagesRule
    ]
  }
}