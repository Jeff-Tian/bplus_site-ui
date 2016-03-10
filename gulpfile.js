var gulp = require('gulp');
var sh = require('shelljs');
var runSequence = require('run-sequence');
var fs = require('fs');
var path = require('path');

gulp.task('default', function (done) {
    console.log('hello');

    done();
});

gulp.task('assemble', function (done) {
    sh.mkdir('artifacts');

    var command = 'rsync -rlptz --delete-after --exclude-from "rsync-exclude.txt" ./. artifacts';
    console.log(command);

    sh.exec(command, done);
});

gulp.task('build', function (done) {
    sh.cd('artifacts');

    sh.exec('cnpm install', function () {
        sh.exec('grunt release', function () {
            sh.exec('cnpm prune --production', function () {
                sh.cd('..');
                done();
            });
        });
    });
});

gulp.task('deploy-hz', function (done) {
    var remote = 'root@hz.liveq.net';
    var command = 'rsync --compress --delete-after -ave ssh artifacts/. ' + remote + ':/var/lib/jenkins/workspace/Website_BridgePlus/.';

    console.log(command);

    sh.exec(command, done);
});

gulp.task('ab', function (done) {
    runSequence('assemble', 'build', done);
});

gulp.task('hz', function (done) {
    runSequence('assemble', 'build', 'deploy-hz', done);
});

gulp.task('make own semantic json', function (done) {
    sh.rm('./semantic.json');
    sh.cp('./own-semantic.json', './semantic.json');
    done();
});

gulp.task('build own semantic files', function (done) {
    require('./semantic/tasks/build')(done);
});

gulp.task('build own semantic', function (done) {
    sh.exec('gulp "make own semantic json"', function () {
        sh.exec('gulp "build own semantic files"', done);
    });
});

gulp.task('make online-store semantic json', function (done) {
    sh.rm('./semantic.json');
    sh.cp('./online-store-semantic.json', './semantic.json');
    done();
});

gulp.task('build online-store semantic', function (done) {
    // Don't change this line! don't even refactor it! To avoid
    // conflict gulp task with buildSemantic above.
    require('./node_modules/online-store/gulpfile.js')(done);
});

gulp.task('release', function (done) {
    sh.exec('gulp "make online-store semantic json"', function () {
        sh.exec('gulp "build online-store semantic"', function () {
            sh.exec('gulp "make own semantic json"', done);
        });
    });
});