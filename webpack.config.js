const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry:{ script:  path.resolve(__dirname, 'src/script.js'), environment: path.resolve(__dirname, 'src/environment.js')},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle[hash].js',
        clean: true,
        assetModuleFilename: 'assets/[name][hash][ext]'
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
         {
           test: /\.(png|jpg|jpeg|svg|gif)$/i,
           type: 'asset/resource',
         },  
         {
          test: /\.js/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
         }     
        ],
      },
      devtool: 'source-map',
      devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
      },
      plugins: [
        new HtmlWebpackPlugin({
            title: 'Jumping-Monster',
            filename: 'index.html',
            template: 'src/index.html'
        })
      ]
}