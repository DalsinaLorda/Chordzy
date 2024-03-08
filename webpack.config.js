module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    },

      { test: /\.ts$/, use: 'ts-loader' },
    ]
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`
  }
}
