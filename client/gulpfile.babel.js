import gulp from 'gulp'
import rename from 'gulp-rename'
import browserify from 'browserify'
import source from 'vinyl-source-stream'

gulp.task('default', ['transpile'])

const sourceFiles = [
  'src/app.js',
  'src/app.config.js',
  'src/controllers/clubController.js',
  'src/services/clubService.js',
]

gulp.task('transpile', () => {
  sourceFiles.map((file) => {
    return browserify(file)
      .transform('babelify')
      .bundle()
      .on('error', (err) => {
        console.log(err) // eslint-disable-line no-console
        this.emit('end')
      })
      .pipe(source(file))
      .pipe(rename({ extname: '.bundle.js' }))
      .pipe(gulp.dest('dist'))
  })
})

gulp.task('watch', ['transpile'], () => {
  gulp.watch('src/**/*', ['transpile'])
  gulp.src([
    '../node_modules/bootstrap/dist/js/bootstrap.min.js',
    '../node_modules/jquery/dist/jquery.min.js',
  ])
  .pipe(gulp.dest('dist/js'))

  gulp.watch('src/**/*', ['transpile'])
  gulp.src([
    '../node_modules/bootstrap/dist/css/bootstrap.min.css',
  ])
  .pipe(gulp.dest('dist/css'))

  gulp.watch('src/**/*', ['transpile'])
  gulp.src([
    '../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.*'
  ])
  .pipe(gulp.dest('dist/fonts'))
})
