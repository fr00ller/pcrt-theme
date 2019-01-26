import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import merge from 'merge2';
import request from 'request';
import buffer from 'gulp-buffer';

import del from 'del';

const paths = {
  styles: {
    main :{
        src: 'css/main.scss',
        dest: 'dist/'
    },
    select2 : {
        src: 'css/select2.scss',
        dest: '../../widgets/select2/assets/css/'
    },
  },
  scripts: {
    main:{
      src: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/infinite-scroll/dist/infinite-scroll.pkgd.js',
        'src/*.js'
      ],
      dest: 'dist/'
    },
    select2:{
      src: 'node_modules/select2/dist/js/**/*',
      dest: '../../widgets/select2/assets/js/'
    }

  },
  watchCSS: {
    src: 'css/*.scss'
  }

};

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'dist' ]);

/*
 * You can also declare named functions and export them as tasks
 */
export function cssmain() {
  return gulp.src(paths.styles.main.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(concat('main.min.css'))
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.main.dest));
}

export function cssselect2() {
  return gulp.src(paths.styles.select2.src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(concat('main.min.css'))
    // pass in options to the stream
    .pipe(rename({
      basename: 'select2',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.select2.dest))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(rename({
      basename: 'select2',
      suffix: ''
    }))
    .pipe(gulp.dest(paths.styles.select2.dest))
    ;
}

export function scripts() {

  return gulp.src(paths.scripts.main.src, { sourcemaps: true })
  .pipe(buffer())
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.scripts.main.dest));


}

export function cloneSelect2js() {

  return gulp.src(paths.scripts.select2.src).pipe(gulp.dest(paths.scripts.select2.dest));

}

export function select2js() {

  return gulp.src(paths.scripts.src, { sourcemaps: true })
  .pipe(buffer())
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.scripts.dest));

}


 /*
  * You could even use `export as` to rename exported tasks
  */
function watchFiles() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.watchCSS, cssmain );
  gulp.watch(paths.watchCSS, cssselect2 );
}
export { watchFiles as watch };

const build = gulp.series(clean, gulp.parallel(cssmain, cssselect2, scripts, cloneSelect2js));
/*
 * Export a default task
 */
export default build;
