// gulpfile.js
var browserSync=require('browser-sync');
var gulp=require('gulp');
var reload=browserSync.reload;
gulp.task('server',function(){
  browserSync({server:{baseDir:'public'}});
  gulp.watch(['*.html','styles/**/*.css','scripts/**/*.js'],{cwd:'public'},reload);
});
