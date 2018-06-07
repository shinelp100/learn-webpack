/*
* 添加样式文件的引用
* */
import './index.less';


const util = require("../../utils/util");

function getUserName() {
    console.log("shinelp100");
}
getUserName();
util.getUserAge();

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock GET request to /users when param `searchText` is 'John'
// arguments for reply are (status, data, headers)
mock.onGet('/users', { params: { searchText: 'John' } }).reply(2000, {
    message:"未知错误1122   "
});

axios.get('/users', { params: { searchText: 'John' } } )
    .then(function(response) {
        console.log(response.data);
    }).catch(function(error){
        console.log(error.response.data.message);
    });



// Load the full build.
var _ = require('lodash');
console.log(_.trim('  a a b b c c c  '));
console.log(_.trim('-_-abc-_-','_-'));