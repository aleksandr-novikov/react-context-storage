module.exports = {
  context: `${__dirname}/src`,
  entry: './sample-app/index.ts',

  output: {
    filename: 'app.js',
    path: `${__dirname}/build`,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
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
  optimization: { sideEffects: false },
};
