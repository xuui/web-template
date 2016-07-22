// gulpfile.js
var browserSync=require('browser-sync');
var gulp=require('gulp');
var reload=browserSync.reload;
var rename=require('gulp-rename');
var uglify=require('gulp-uglify');
var config={
  js:{src:'./public/scripts/**/*',dest:'./build/scripts'},
};
gulp.task('server',function(){
  browserSync({server:{baseDir:'public'}});
  gulp.watch(['*.html','styles/**/*.css','scripts/**/*.js'],{cwd:'public'},reload);
});
gulp.task('uglify',function(){
  return gulp.src(config.js.src)
  .pipe(gulp.dest(config.js.dest))
  .pipe(uglify())
  .pipe(rename({extname:'.min.js'}))
  .pipe(gulp.dest(config.js.dest));
});