/*eslint-disable no-console, no-var */
var express = require('express')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')
var bodyParser = require('body-parser');
var logger = require('./log4js.config').logger;

var querystring = require('querystring');
var http = require('http');
var URL = require('url');


var fs = require('fs')
var path = require('path')

//文件变量映射配置
var configObj = require('./system.config');

var app = express();
app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/__build__/',
    stats: {
        colors: true
    }
}))

//配置ejs
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.use('/', demo);

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//变量映射读取配置文件的对象
var obj = '';
fs.readFile('system_config.json', 'utf8', function (err, data) {
    if (err) throw err;
    logger.info("系统配置："+data);
    obj = JSON.parse(data);
    (new configObj()).setValueFunc(obj);
});


fs.readdirSync(__dirname + '/views/').forEach(function (file) {
    if (fs.statSync(path.join(__dirname + '/views/', file)).isDirectory())
        app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
})

app.use(express.static(__dirname));


/*活动可用 */
app.post('/api', function (req, res, next) {

    //var url = URL.parse(req.body.apiUrl);
    var apiUrl = req.body.apiUrl;
    var data = querystring.stringify(req.body);
    var config = new configObj();
    var opt = {
        method: "POST",
        host: config.getApiMachineFunc(),
        port: config.getPortFunc(),
        path: apiUrl,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": data.length
        }
    };
    //200表示状态成功，500表示状态错误

    logger.info("[API URL：http://"+opt.host+":"+opt.port+opt.path+"]");
    var reqNew = http.request(opt, function (serverFeedback) {
            if (serverFeedback.statusCode == 200) {
                var body = "";
                serverFeedback.on('data', function (data) {
                        body += data;
                    }).on('end', function () {
                        if(body==''){
                            body={
                                resCode:false
                            }
                        }
                        res.send(200, body);
                    });
            } else {
                logger.info('请求错误，状态码：'+serverFeedback.statusCode);
            }
    });

    //监听错误事件
    reqNew.on('error', function (e) {
        var body={
            resCode:false
        };
        res.send(200, body);
        logger.error('problem with request: ' + e.message);
    });
    reqNew.write(data);
    reqNew.end();
})
app.listen(8083, function () {
    console.log('Server listening on http://localhost:8082, Ctrl+C to stop')
})

module.exports = app;


