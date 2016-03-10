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

gulp.task('replace-bplus', function (done) {
    var replace = require('gulp-replace');

    return gulp.src(['client/dist/semantic/dist/semantic.min.css'])
        .pipe(replace(/https:\/\/fonts\.googleapis\.com\/css/g, 'http://fonts.useso.com/css'))
        .pipe(gulp.dest('client/dist/semantic/dist/'));
});

gulp.task('online-store-build', function (done) {
    return require('./node_modules/online-store/gulpfile.js')(done);
});

gulp.task('run online-store-build', function (done) {
    sh.exec('gulp online-store-build', done);
});

gulp.task('run replace-bplus', function (done) {
    sh.exec('gulp replace-bplus', done);
});

gulp.task('release', function (done) {
    // Here use sh.exec() to run 2 tasks to ensure
    // the sequence not interrupted by the asynchronous events.
    runSequence(
        'run online-store-build',
        'run replace-bplus',
        done
    );
});