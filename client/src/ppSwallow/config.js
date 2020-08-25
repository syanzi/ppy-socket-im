const dev = process.env.NODE_ENV !== "production";

let baseUrl; //base接口地址     "https://gate1.mokayuedu.com/"; //正式服务器
let routerMode; //路由模式
let reportUrl; //数据上报url
let yueWenUrl; //阅文URL

//开发环境
if (dev) {
    yueWenUrl = "yuewenapi/"; //dev
    reportUrl = "reportapi/"; //dev
    baseUrl = "http://47.92.232.163:8207/"; //dev
    routerMode = "hash";
} else {
    yueWenUrl = "yuewenapi/"; //dev
    reportUrl = "reportapi/";
    baseUrl = "api/";
    routerMode = "history";
}
const md5Params = {
    md5key: "TJTXOswvftDc7zNc",
    signKey: "sign"
};

const defaultParams = () => {
    return {
        platform: "PC",
        version: "1.0.0",
        //userid: getUserId() || "",
        t: new Date().getTime()
    };
};

export default {
    baseUrl,
    reportUrl,
    yueWenUrl,
    routerMode,
    md5Params,
    defaultParams
};
