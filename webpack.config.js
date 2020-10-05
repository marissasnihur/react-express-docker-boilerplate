const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new CleanWebpackPlugin(['dist/js'], {
    verbose: true
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/server/views/index.html'),
    filename: 'index.html',
    inject: 'body'
  })
]

module.exports = {
  devtool: 'eval-source-map',
  entry: ['./src/client'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
    rules: [
      { 
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: plugins
}
