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
karma start client/www/test/my.conf.js
```
Ideally integrate the test task into Grunt task, but currently I can't get it work.