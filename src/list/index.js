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
mock.onGet('/users', { params: { searchText: 'John' } }).reply(200, {
    users: [
        { id: 1, name: 'John Smith' }
    ]
});

axios.get('/users', { params: { searchText: 'John11' } } )
    .then(function(response) {
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });