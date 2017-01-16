// gulpfile.js
var browserSync=require('browser-sync'),
    gulp=require('gulp'),
    imagemin=require('gulp-imagemin'),
    less=require('gulp-less'),
    minifycss=require('gulp-clean-css'),
    include=require("gulp-include");,
    rename=require('gulp-rename'),
    uglify=require('gulp-uglify');
var reload=browserSync.reload;
var config={
  less:{all:'./public/styles/**/*.less',src:'./public/styles/*.less',dest:'./build/styles',settings:{}},
  images:{src:'./public/images/**/*',dest:'./build/images'},
  js:{src:'./public/scripts/**/*',dest:'./build/scripts'},
  css:{src:'./public/styles/**/*',dest:'./build/styles'}
};
gulp.task('default',['less','css','uglify','imagemin']);
gulp.task('server',function(){
  browserSync({server:{baseDir:'public'}});
  gulp.watch(['*.html','styles/**/*.css','scripts/**/*.js'],{cwd:'public'},reload);
});
gulp.task('imagemin',function(){
	return gulp.src(config.images.src).pipe(imagemin()).pipe(gulp.dest(config.images.dest))
})
gulp.task('less',function(){
	return gulp.src(config.less.src).pipe(less(config.less.settings)).pipe(gulp.dest(config.less.dest))
});
gulp.task('css',function(){
  return gulp.src(config.css.src)
  .pipe(minifycss())
  .pipe(gulp.dest(config.css.dest));
});
gulp.task('uglify',function(){
  return gulp.src(config.js.src)
  .pipe(gulp.dest(config.js.dest))
  .pipe(uglify())
  .pipe(rename({extname:'.min.js'}))
  .pipe(gulp.dest(config.js.dest));
});
gulp.task("inc-html", function() {
  //console.log(' <!--=include relative/path/to/file.html --> ');
  gulp.src("inx.html")
    .pipe(include({extensions:"html"}))
      .on('error', console.log)
    .pipe(gulp.dest("dist"));
});
gulp.task("inc-css", function() {
  //console.log(' /*=include relative/path/to/file.css */ ');
  gulp.src("inx.css")
    .pipe(include({extensions:"css"}))
      .on('error', console.log)
    .pipe(gulp.dest("dist"));
});
gulp.task("inc-js", function() {
  //console.log(' //=include relative/path/to/file.js ');
  gulp.src("inx.js")
    .pipe(include({extensions:"js"}))
      .on('error', console.log)
    .pipe(gulp.dest("dist"));
});
