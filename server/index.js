var mongoDB = require("./db.js");

var express = require("express");
const path = require("path");
var app = express();
exports.app = app;
const port = process.env.PORT || 8080;

//设置首屏渲染页面
app.get("/", function (req, res) {
  //这里可以引入模板引擎，比如artTemplate，渲染成一个真实的html页面
  res.render("index", {
    user: {
      name: "aui",
      tags: ["art", "template", "nodejs"],
    },
    title: "我是服务端首页渲染，防止首页白屏",
  });
});

app.get("/mikan", function (req, res) {
  res.render("mikan", { title: "Mikan Page" });
});

app.get("/blog", function (req, res) {
  res.render("blogs", {
    blogs: [
      {
        title: "First Blog Post",
        content: "This is the content of my first blog post.",
        author: "John Doe",
        date: "2024-03-17",
      },
      {
        title: "Second Blog Post",
        content: "This is the content of my second blog post.",
        author: "Jane Smith",
        date: "2024-03-18",
      },
    ],
  });
});

// 设置浏览器可以直接访问的静态文件目录，例如localhost:9000/index.html
app.use(express.static("public"));

// 通配路由，返回生产环境index.html，然后由前端代码处理交互以及路由跳转等
app.get("*", function (request, response) {
  response.sendFile(path.resolve("public/index.html"));
});

// 设置模板引擎为 art
app.set("view engine", "ejs");
// app.engine("art", require("express-art-template"));
// app.set("view options", {
//   debug: process.env.NODE_ENV !== "production",
// });

// 接受前端login请求，返回数据
app.post("/login", function (req, res) {
  //此处可以通过request模块向java后端请求api，获取数据后推送给view层，从而达到分发请求的目的
  res.send("POST request to the homepage");
});

// 监听服务
app.listen(port, function () {
  console.log("Example app listening on port 9000!");
});

// 导入 mongoose 模块
const mongoose = require("mongoose");

// 设置默认 mongoose 连接
mongoose.connect(mongoDB.uri);
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on("error", console.error.bind(console, "MongoDB 连接错误："));
