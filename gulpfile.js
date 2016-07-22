// gulpfile.js
var browserSync=require('browser-sync'),gulp=require('gulp'),imagemin=require('gulp-imagemin'),less=require('gulp-less'),minifycss=require('gulp-minify-css'),rename=require('gulp-rename'),uglify=require('gulp-uglify');
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
  return gulp.src(config.css.src).pipe(minifycss()).pipe(gulp.dest(config.css.dest));
});
gulp.task('uglify',function(){
  return gulp.src(config.js.src)
  .pipe(gulp.dest(config.js.dest))
  .pipe(uglify())
  .pipe(rename({extname:'.min.js'}))
  .pipe(gulp.dest(config.js.dest));
});