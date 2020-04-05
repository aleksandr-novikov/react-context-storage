const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const withCacheLoader = ['babel-loader', 'ts-loader'];

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    context: `${__dirname}/src`,
    entry: mode === 'development' ? './sample-app/index.ts' : './index.ts',

    output: {
      filename: mode === 'development' ? 'app.js' : 'build.js',
      path: `${__dirname}/dist`,
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js'],
      alias: { 'react-dom': '@hot-loader/react-dom' },
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: withCacheLoader,
        },
        {
          test: /\.(html)$/,
          exclude: [/node_modules/],
          use: {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          exclude: [/node_modules/],
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            'css-loader',
          ],
        },
      ],
    },
    devtool: 'source-map',
    plugins: [new CleanWebpackPlugin()],
  };
};
