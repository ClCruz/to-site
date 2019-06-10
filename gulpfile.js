var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var favicons = require('favicons').stream,
	log = require('fancy-log');
var minimist = require('minimist');
const purgecss = require('gulp-purgecss');

gulp.task('purgecss', () => {
	return gulp
		.src('./public/assets/css/*.css')
		.pipe(
			purgecss({
				content: [ './src/**/*.vue', './src/**/*.js', './src/index.html' ]
			})
		)
		.pipe(gulp.dest('./test/'));
});

gulp.task('sass', function() {
	gulp
		.src('./src/scss/themes/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/css/'))
		.pipe(livereload());
});

gulp.task('sassLocal', function() {
	gulp
		.src('./src/scss/themes/*compreingre*/*.scss')
		.pipe(
			sass({
				outputStyle: 'nested'
			}).on('error', sass.logError)
		)
		.pipe(gulp.dest('./public/assets/css/'))
		.pipe(livereload());
});

gulp.task('sassLocalhost', function() {
	gulp
		.src('./src/scss/themes/www.tixs.me/main.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/css/localhost/'));
	gulp
		.src('./src/scss/themes/www.cafeteatrorubi.com.br/main.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/css/www.cafeteatrorubi.tk/'));
	gulp
		.src('./src/scss/themes/www.teatroumc.com.br/main.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/css/ingressos.teatroumc.com.br/'));
	gulp
		.src('./src/scss/themes/www.xwxy.com.br/main.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/css/www.xwxy.me/'));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./src/scss/**/*.scss', [ 'sassLocal' ]);
	// gulp.watch('./src/scss/**/*.scss', [ 'sassLocalhost' ]);
	gulp.watch([ './src/**/*.css' ], function(files) {
		livereload.changed(files);
	});
});

var params = {
	string: 'whitelabel',
	default: { whitelabel: 'tixsme' }
};

var options = minimist(process.argv.slice(2), params);

gulp.task('scripts', function() {
	return gulp
		.src('**/*.js')
		.pipe(gulpif(options.env === 'production', uglify())) // only minify in production
		.pipe(gulp.dest('dist'));
});

//gulp favicon --whitelabel bringressos
gulp.task('favicon', function() {
	return gulp
		.src('public/assets/logo-' + options.whitelabel + '*')
		.pipe(
			favicons({
				background: '#fff',
				path: 'public/assets/favicons/',
				scope: '/',
				logging: true,
				html: 'index.html',
				pipeHTML: false,
				replace: true,
				icons: {
					// Platform Options:
					// - offset - offset in percentage
					// - background:
					//   * false - use default
					//   * true - force use default, e.g. set background for Android icons
					//   * color - set background for the specified icons
					//   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
					//   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
					//   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
					//
					android: false, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
					appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
					appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
					coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
					favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
					firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
					windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
					yandex: false // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
				}
			})
		)
		.on('error', log)
		.pipe(gulp.dest('./public/img/' + options.whitelabel));
});
