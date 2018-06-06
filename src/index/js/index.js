/*
* 添加样式文件的引用
* */
import '../css/index.less';

const FastClick = require("../../../libs/fastclick");
const util = require("../../../utils/util");

function getUserName() {
    FastClick.attach(document.body);
    console.log("shinelp100");
}
getUserName();
util.getUserAge();

var a = 123;
console.log(a);