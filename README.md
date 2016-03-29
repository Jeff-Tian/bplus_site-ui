#Bridge+

## Getting Started

Install dependencies and run your app locally.

### Install Dependencies

```
npm install
bower install
```

!!!BE SURE TO RUN ABOVE SCRIPTS EVERY SYNC UP!!!

### Run project on dev mode

```
grunt
```

### Create release version
LIVE environment will use release version files.
```
grunt release
```

### Create release version and run on local machine 
```
grunt local-release
```

Now browse to the website at `http://localhost:12000`

### Code format

CSS
- use even number for `z-index`

JS
- Do not define global object

### Run server side code test
```
mocha
```

### Runn client side code test
```
grunt karma
```

Or

```
karma start client/www/test/my.conf.js
```

### Run e2e test
Open a terminal
```
webdriver-manager start
```

Then open another terminal and 
```
grunt e2e
```

### Semantic
If you customized semantic styles in the ./semantic folder, you need to run 
```
gulp 'build own semantic'
```
to generate the compiled files, and then commit and push to the source control.

### Sub domains
```
uat.corp.bridgeplus.cn --> 116.247.126.75 --> 10.20.32.51 --> uat.bridgeplus.cn/corp/*
```

### Back end Router Structure for new module
To build a new module, for example, `corp` for BridgePlus Company users, add a *router file* (`corp.js`) under `~/routers/` folder. And then register it in the `server.js` by the following line:
```javascript
server.use(localeHelper.regexPath('/corp', false), require('./routes/corp.js'));
```

### 413 Request Entity Too Large
Nginx出现“413 Request Entity Too Large”错误解决方法  

2011-03-25 13:49:55|  分类： 默认分类 |  标签：413  request  entity  too  large  nginx出现  错误解决方法   |举报|字号 订阅
    
  下载LOFTER我的照片书  |
今天使用Wordpress的flash版文件上传功能的时候，总是提示接口错误，很是郁闷。换小文件发现没有问题，所以问题肯定出现在文件大小上，找了半天没有发现wordpress有限制上传文件大小的地方。

切换到传统文件上传界面，重新上传一个大文件，这回出来错误提示了，413 Request Entity Too Large，google了一下，发现是Nginx的错误提示。

解决方法：打开nginx主配置文件nginx.conf，找到http{}段，添加
client_max_body_size 20m;
Centos下 vi /usr/local/nginx/conf/nginx.conf

重启NGINX
kill -HUP `cat /usr/local/nginx/nginx.pid `
恢复正常