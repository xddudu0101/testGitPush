var log4js = require('log4js');
//var logger = log4js.getLogger();
log4js.configure('my_log4js_configuration.json', {reloadSecs: 300});
var console = log4js.getLogger('console');
var dateFileLog = log4js.getLogger('dateFileLog');
var FileLog = log4js.getLogger('FileLog');

//(һ����������)
//�ļ���־����
//exports.logger = FileLog;

//ʱ���ļ���־����
//exports.logger = dateFileLog;

//����̨�����־����
exports.logger = console;


exports.use = function(app) {

    //�����ļ���־
    //app.use(log4js.connectLogger(FileLog, {level:'DEBUG', format:':method :url'}));

    //��ʱ�������ļ���־
    //app.use(log4js.connectLogger(dateFileLog, {level:'DEBUG', format:':method :url'}));

    //����̨�����־
    app.use(log4js.connectLogger(console, {level:'DEBUG', format:':method :url'}));
};
