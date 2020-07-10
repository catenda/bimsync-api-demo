const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CSSModuleLocalIdent = '[local]--[hash:base64:5]';

const cssEnableModuleOptions = {
  modules: {
    localIdentName: CSSModuleLocalIdent
  },
  esModule: true,
  sourceMap: true,
  localsConvention: 'camelCase'
};

const miniCssExtractLoaderOptions = isProductionEnv => ({
  // only enable hot in development
  hmr: !isProductionEnv,
  // if hmr does not work, this is a forceful method.
  reloadAll: true,
  ignoreOrder: false
});

const getStyleLoader = (isProductionEnv) => ({
  loader: MiniCssExtractPlugin.loader,
  options: miniCssExtractLoaderOptions(isProductionEnv)
});

const outputDirectory = 'dist';
const scssRegex = /\.(scss)$/;
const scssModuleRegex = /\.module\.scss$/;

module.exports = (env) => {
  const isProductionEnv = env === "production";

  const styleLoader = getStyleLoader(isProductionEnv);
  
  return {
    entry: './src/client/index.jsx',
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'bundle.js',
      publicPath: '/'
    },
    stats: {
      children: false
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          resolve: {
            extensions: ['.js', '.jsx']
          },
          include: [path.resolve(__dirname, 'src/client')],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react', '@babel/env']
            }
          }
        },
        {
          test: scssRegex,
          exclude: scssModuleRegex,
          include: path.resolve(__dirname, 'src/client'),
          use: [styleLoader, 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: scssModuleRegex,
          include: path.resolve(__dirname, 'src/client'),
          use: [
            styleLoader,
            {
              loader: 'css-loader',
              options: cssEnableModuleOptions
            },
            'postcss-loader',
            {
              loader: 'css-modules-typescript-loader',
              options: {
                mode: isProductionEnv ? 'verify' : 'emit'
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    devServer: {
      port: 3000,
      open: true,
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'public'),
      proxy: {
        '/api/**': {
          target: 'http://[::1]:9000',
          secure: false,
          changeOrigin: true
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      })
    ]
  };
};
