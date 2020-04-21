const path = require('path'); 
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// webpack.congfig.js
module.exports = {
	mode:"development",  //开发环境
	entry: path.join(__dirname, './src/main.js'),  //打包main.js
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool:'eval-source-map',  //映射工具
	devServer: {   
		port: 8080,
		hot: true
	},
	plugins: [  
		new htmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html',	
			favicon: './my.ico'
		}),
		new VueLoaderPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			},
			{
				test:/\.(png|jpg|jpeg)$/,
				use: {    
					loader:'url-loader',
					options:{
						limit:200*1024, //当图片小于多少k时,用base64转化
						outputPath:'/img/',
						publicPath:'https://www.cissy.org/'
					}
				}
			},
			{   
				test: /\.css$/, 
				use:  ['style-loader', 'css-loader','postcss-loader'] 
			},
			{
				test: /\.js$/,   
				use: 'babel-loader',  
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,   
				use: 'vue-loader',  
			}
		]
	},
	resolve: {      //模块解析
		alias: {	//修改Vue默认被导入时的路径
			'vue$':'vue/dist/vue.js'
		}
	}
}