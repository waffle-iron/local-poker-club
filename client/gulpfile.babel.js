import gulp from 'gulp'
import rename from 'gulp-rename'
import browserify from 'browserify'
import source from 'vinyl-source-stream'

gulp.task('default', ['transpile'])

const sourceFiles = [
  'src/app.js',
  'src/app.config.js'
]

gulp.task('transpile', () => {
  sourceFiles.map(function(file) {
    return browserify(file)
      .transform('babelify')
      .bundle()
      .on('error', function(err){
        console.log(err) //eslint-disable-line no-console
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
    '../node_modules/jquery/dist/jquery.min.js'
  ])
  .pipe(gulp.dest('dist'))
})
