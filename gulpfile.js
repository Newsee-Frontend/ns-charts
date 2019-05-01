var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var _module_name = 'ns-charts.js';
var _base_path = 'src/';
var _base_path_leaf = '**/*.js';
var _base_dist_path = 'es';

var t = 0;
var showinfo = function () {
    t++;
    var curDate = new Date();
    var Year = curDate.getFullYear().toString().slice(-2);
    var Month = ('0' + (curDate.getMonth() + 1)).slice(-2);
    var Day = ('0' + curDate.getDate()).slice(-2);
    var Hours = ("0" + curDate.getHours()).slice(-2);
    var Minutes = ("0" + curDate.getMinutes()).slice(-2);
    return FullDate = '\n' + '           - Author : 高仓雄（gcx / Spring of broccoli，Contact ：Wechat（lensgcx）' + '\n' + '           - Date:' + Year + '-' + Month + '-' + Day + '-' + Hours + '-' + Minutes + '\n' + '           - Current: ' + t + 'st refresh loading... ' + '\n' + '           - running tasks...';
};


process.env.BABEL_MODULE = 'commonjs';


gulp.task('js-handle', function () {
    gulp.src([_base_path + _base_path_leaf, '!src/ns-charts.js'])
        .pipe(babel())
        .pipe(uglify({
            mangle: true,
            compress: true
        }))
        .pipe(gulp.dest(_base_dist_path))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(notify({message: '===== babel and uglify task complete ====='}));
});

gulp.task('entry-rename', function () {
    gulp.src(_base_path + _module_name)
        .pipe(babel())
        .pipe(uglify({
            mangle: true,
            compress: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(_base_dist_path))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
});

gulp.task('watch', () => {
    gulp.watch(_base_path + _base_path_leaf, ['js-handle']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + showinfo() + '')
    });
    gulp.watch(_base_path + _module_name, ['entry-rename']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + showinfo() + '')
    });

});


gulp.task('default', ['js-handle', 'entry-rename', 'watch']);

