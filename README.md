#Bridge+

## Getting Started

Install dependencies and run your app locally.

### Install Dependencies

```
npm install
bower install
```

!!!BE SURE TO RUN ABOVE SCRIPTS EVERY SYNC UP!!!

### Run project

```
grunt
```

Now browse to the website at `http://localhost:8000/index`

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