var path = require("path");
var fs = require("fs");

const solc = require("solc");

//获取文件路径
const filepath = path.resolve(__dirname,'contracts','Lottry.sol');
// console.log(__dirname);
// console.log(filepath);
//
//读取文件内容
const source = fs.readFileSync(filepath,"utf8");
// console.log(solc.compile(source,1).contracts[":Lottry"]);
// console.log(solc.compile(source,1).contracts[":Lottry"]）;
//模块可以通过module.exports将函数、变量等导出，以使其它 JavaScript 脚本通过require() 函数引入并使用。　
module.exports = solc.compile(source,1).contracts[":Lottry"];
