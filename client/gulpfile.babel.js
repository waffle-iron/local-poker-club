import gulp from 'gulp'
import rename from 'gulp-rename'
import browserify from 'browserify'
import source from 'vinyl-source-stream'

gulp.task('default', ['transpile'])

const sourceFiles = [
  'src/app.js'
]

gulp.task('transpile', () => {
  sourceFiles.map(function(file) {
    return browserify(file)
      .transform('babelify')
      .bundle()
      .on('error', function(){
        this.emit('end')
      })
      .pipe(source(file))
      .pipe(rename({extname: '.bundle.js'}))
      .pipe(gulp.dest('dist'))
  })
})

gulp.task('watch', ['transpile'], () => {
  gulp.watch('src/**/*', ['transpile'])
  gulp.src([
    '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
    '../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../node_modules/jquery/dist/jquery.min.js',
    '../node_modules/angular-ui-router/release/angular-ui-router.min.js'
  ])
  .pipe(gulp.dest('dist'))
})
