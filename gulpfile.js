var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var jade        = require('gulp-jade');
var concat 		  = require('gulp-concat');
var uglify 		  = require('gulp-uglify');
var react 		  = require('gulp-react');
var gulp        = require('gulp');
var htmlreplace = require('gulp-html-replace');
var reactEasy   = require('gulp-react-easy');
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

//React

gulp.task('buildBundle', function() {
  return reactEasy({
      file: './app/App.jsx',
      debug: true
    })
    .to('bundle.js')
    .pipe(gulp.dest('.'))
    .pipe(browserSync.reload({stream:true}));
});


//Default, Watch

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'buildBundle', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('sass', function () {
   return gulp.src('src/css/style.sass')
    .pipe(sass({
      includePaths: ['sass'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('_site/src/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('src/css'));
});

gulp.task('jade', function(){
    return gulp.src('_jadefiles/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(''));
});

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
       .pipe(gulp.dest('_site/src/js'))
       .pipe(browserSync.reload({stream:true}))
       .pipe(gulp.dest('src/js'));
});

gulp.task('watch', function () {
  gulp.watch('src/css/**', ['sass']);
  gulp.watch('app/*.jsx', ['buildBundle','jekyll-rebuild', 'jekyll-rebuild']);
  gulp.watch(['*.html'], ['jekyll-rebuild']);
  gulp.watch('_jadefiles/*.jade', ['jade']);
	gulp.watch('src/js/functions.js', ['js']);
	gulp.watch('images/**', ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);