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

var buildOnlineStore = require('./node_modules/online-store/gulpfile.js');
gulp.task('release', function (done) {
    buildOnlineStore(done);
});