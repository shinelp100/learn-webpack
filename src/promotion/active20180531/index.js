/*
* 添加样式文件的引用
* */
import './index.less';

const Another = require("./another");
const util = require("../../utils/util");

function getUserName() {
    console.log("shinelp100");
}
getUserName();
util.getUserAge();
Another();