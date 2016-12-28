/**
 * Created by JiumingYe on 2016/10/10.
 */

var params = {
    api_machine : "",
    port : "",
    app_version : "",
    path : ""
};
var ConfigIni = function(){};

ConfigIni.prototype.setValueFunc = function(obj){
    params.api_machine = obj.api_machine;
    params.port = obj.port;
    params.app_version = obj.app_version;
    params.path = obj.path;
};

ConfigIni.prototype.getApiMachineFunc = function(){
    return params.api_machine;
};

ConfigIni.prototype.getPortFunc = function(){
    return params.port;
};
module.exports = ConfigIni;