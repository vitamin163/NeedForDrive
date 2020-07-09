const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = (env, options) => {
  const PATHS = {
    src: path.resolve(__dirname, './src'),
    dist: path.resolve(__dirname, './dist'),
    public: path.resolve(__dirname, './public'),
    assets: 'assets/',
  };
  const isProduction = options.mode === 'production';
  const isDevelopment = !isProduction;
  const conf = {
    entry: [
      '@babel/polyfill',
      './src/index.jsx',
    ],
    output: {
      path: PATHS.dist,
      filename: '[name].js',
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    devServer: {
      overlay: true,
      contentBase: PATHS.dist,
    },

    devtool: isProduction ? 'source-map' : 'eval-sourcemap',

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                reloadAll: true,
                sourceMap: isDevelopment,
                hmr: isDevelopment,
              },
            },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
          ],
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                reloadAll: true,
                sourceMap: isDevelopment,
                hmr: isDevelopment,
              },
            },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: `${PATHS.assets}/img`,

          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: `${PATHS.dist}/index.html`,
        template: `${PATHS.public}/index.html`,
        favicon: `${PATHS.public}/favicon.ico`,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyWebpackPlugin(
        {
          patterns: [
            { from: `${PATHS.src}/img`, to: `${PATHS.dist}/${PATHS.assets}img` },
          ],
        },
      ),
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    ],
  };

  return conf;
};
