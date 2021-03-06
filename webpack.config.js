/*eslint-disable no-var */
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {

    //devtool: 'inline-source-map',

    entry:
        fs.readdirSync(__dirname+'/views/').reduce(function (entries, dir) {
        if (fs.statSync(path.join(__dirname+'/views/', dir)).isDirectory())
            entries[dir] = path.join(__dirname+'/views/', dir,'index.js')
        return entries
         }, {}),//?????????????????????????index.js???
    output: {
        path: __dirname + '/__build__',   //??????????
        filename: '[name].js',            //?????????????
        chunkFilename: '[id].chunk.js',
        publicPath: '/__build__/'
    },

    module: {
        loaders: [
            {   test: /\.js$/, exclude: /node_modules/,
                loader: 'babel'
            },
            //?????????????file-loader??????????????????С???????base64??????http????
            //???????????С??8192byte???????base64??
            {   test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'},
            {
                //test: /\.(css)$/,
                //????css????????????????'-loader'??????
                //loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                //loader: 'style-loader!css-loader'

                test: /\.css$/,
                loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]'


            },
            {   //html???????????????????????????????????ò???attrs=img:src??????????src????????
                //???????????attrs=img:src img:data-src????????????data-src???????????????????????
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
            },

            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap'
            }
        ]
    },

    resolve: {
        extensions: ['', '.coffee', '.js','.css']
    },

    plugins: [
		//new webpack.optimize.UglifyJsPlugin({
		//	compress: {
		//		warnings:false
		//	}
		//}),
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		//????????????
		new webpack.NoErrorsPlugin()
	]


}
