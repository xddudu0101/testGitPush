var log4js = require('log4js');
//var logger = log4js.getLogger();
log4js.configure('my_log4js_configuration.json', {reloadSecs: 300});
var console = log4js.getLogger('console');
var dateFileLog = log4js.getLogger('dateFileLog');
var FileLog = log4js.getLogger('FileLog');

//(一共三种类型)
//文件日志对象
//exports.logger = FileLog;

//时间文件日志对象
//exports.logger = dateFileLog;

//控制台输出日志对象
exports.logger = console;


exports.use = function(app) {

    //生成文件日志
    //app.use(log4js.connectLogger(FileLog, {level:'DEBUG', format:':method :url'}));

    //按时间生成文件日志
    //app.use(log4js.connectLogger(dateFileLog, {level:'DEBUG', format:':method :url'}));

    //控制台输出日志
    app.use(log4js.connectLogger(console, {level:'DEBUG', format:':method :url'}));
};
