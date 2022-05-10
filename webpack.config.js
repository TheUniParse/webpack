const path = require('path')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  //mode: 'none',//'development', //'productionⒹ|development|none'
  entry: {
    bundle: './src/index.js',
    //vender:'src/vender.js'
  }, output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true, //clean old caches
    assetModuleFilename: '[name][ext]'
  }, devtool: false, //'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,//d'8080
    open: true,
    hot: true,//hot reload
    compress: true,//Gzip
    historyApiFallback: true,
  }, module: { //transform import|recuire() files by loaders
    rules: [
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // }, {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // }, 
      {
        test: /\.(svg)$/i,
        type: 'asset/resource'
      }, {
        test: /\.(png|jpg|jpeg|webp|gif|tiff?)/i,
        use: [
          //"file-loader", //useless if toBuffer:false
          {
            loader: "webpack-sharp-loader",
            options: {
              toBuffer: false,// same format
              processFunction: (sharp) => sharp.webp({
                quality: 50, //80d
                alphaQuality: 50, //0~100d
                lossless: false, //falseⒹ
                nearLossless: false, //falseⒹ
                smartSubsample: false, //falseⒹ high quality chroma
                effort: 0, //0fastest~6slowest 4d cpu's
                // loop: 0, //0d infinity # times animation frames
                // delay: 0, //animation ms between frames
                //force: true //trueⒹ format
              }),//.toFormat('webp'),
              fileLoaderOptions: {
                name: "[name].[contenthash].[ext]"
              },
            },
          },
        ],
      },
    ]
  }, plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'webpack app',
    //   filename: 'index.html',
    //   template: 'src/template.html'
    // }),
    //new BundleAnalyzerPlugin()
  ]
}