const gulp = require('gulp'),
  pug = require('gulp-pug'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  history = require('connect-history-api-fallback');

gulp.task('pug', () =>
gulp.src('./dev/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'))
);

gulp.task('imagenes', function () {
  gulp.src('./dev/**/*.+(jpg|png|eot|svg|ttf|woff|woff2)')
    .pipe(gulp.dest('./dist/'))
});

gulp.task('css', function () {
  gulp.src('./dev/**/*.css')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
});


gulp.task('sass', ()=> {
  gulp.src('./dev/scss/*.scss')
  .pipe(sass(sassOptions))
  //.pipe(ignoreErrors())
  .pipe(autoprefixer({
    versions: ['Last 2 Browsers']
  }))
  .pipe(gulp.dest('./dist/'));
});


gulp.task('js', function () {
  gulp.src('./dev/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('html', function() {
  gulp.src('./dev/**/*.html')
    .pipe(connect.reload())
    .pipe(gulp.dest('./dist/'))
});

// 1. Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
    root: './dist/',
    hostname: '0.0.0.0',
    port: 8087,
    livereload: true,
    middleware: function(connect, opt) {
      return [ history({
        //index: '/index.html',
        //logger: console.log.bind(console),
        //disableDotRule: false
      }) ];
    }
  })
});

gulp.task('watch', function() {
  gulp.watch(['./dev/**/*.+(html|css|pug|js)'] , ['opciones']);
  console.log('El archivo ' + this.path + ' ha sido ' + this.type + ', realizando tareas...');
});

gulp.task('default', ['server', 'watch']);

gulp.task('opciones', ['pug', 'imagenes', 'css', 'html', 'js']);