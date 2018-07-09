//Используется более "строгий" код
"use strict";

//импорт всех неоходимых плагинов gulp
var gulp = require("gulp"); //собственно, сам gulp
var prefixer = require("gulp-autoprefixer"); //автопрефиксер
var minify = require("gulp-minify-css"); //минификатор css
var browserSync = require("browser-sync"); //локальный сервер для livereload
var imagemin = require("gulp-imagemin"); //минификатор изображений
var pngquant = require("imagemin-pngquant"); //дополнение к минификатору изображений для png
var uglify = require("gulp-uglify"); //минификатор для js
var less = require("gulp-less"); //препроцессор less и его компилятор
var sourcemaps = require("gulp-sourcemaps"); //помощник при отладке (хз че такое пока что)
var rigger = require("gulp-rigger"); //тоже вроде крутая штука, но по-прежнему хер знает что это
var watch = require("gulp-watch"); //следит за изменениями проекта
var rimraf = require("rimraf"); //rm -rf для ноды (удаляет лишние файлы в продакшн, если их нет в разработке)
var plumber = require("gulp-plumber");
var reload = browserSync.reload;

var path = { // переменная для обозначения путей
  build: { // пути куда нужно всё складывать
    html: "build/",
    css: "build/css",
    js: "build/js",
    fonts: "build/fonts",
    img: "build/img"
  },
  src: { // пути откуда всё вытаскивать
    html: "src/*.html",
    style: "src/less/**/*.less",
    js: "src/js/script.js",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*"
  },
  watch: { // за кем я хочу наблюдать
    html: "src/**/*.html",
    style: "src/less/**/*.*",
    js: "src/js/**/*.*",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*"
  },
  clean: "./build"
};

var config = { //настройки dev сервера
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: "localhost",
  port: 9000,
  logPrefix: "Artur"
};

gulp.task("html:build", function() {
  gulp.src(path.src.html) //выбор нужных файлов
    .pipe(rigger()) //прогон через rigger
    .pipe(gulp.dest(path.build.html)) //перенос в папку продакшн-версию
    .pipe(reload({stream: true})); //перезагрузка сервера
});

gulp.task("js:build", function() {
  gulp.src(path.src.js) //нашли файл
    .pipe(rigger()) // прогон через риггер
    .pipe(sourcemaps.init()) //инициализируем сорсмап
    .pipe(uglify()) // сжатие js
    .pipe(sourcemaps.write()) //пропишем карты
    .pipe(gulp.dest(path.build.js)) //перенос в продакшн
    .pipe(reload({stream: true})); //релоад сервера
});

gulp.task("style:build", function() {
  gulp.src(path.src.style) //нашли файл
    .pipe(plumber())// типа livereload
    .pipe(sourcemaps.init()) //то же самое что и с js
    .pipe(less()) //компилируем в css
    .pipe(prefixer()) //добавляем вендорные префиксы
    .pipe(minify()) //сожмем
    .pipe(sourcemaps.write()) //до сих пор хз че это
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true})); //reload
});

gulp.task("image:build", function() {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task("fonts:build", function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({stream: true}));
});

gulp.task("build", function() {
  "html:build",
  "js:build",
  "style:build",
  "image:build",
  "fonts:build";
});

gulp.task("watch", function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start("html:build");
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start("js:build");
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start("style:build");
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start("image:build");
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start("fonts:build");
  });
});

gulp.task("webserver", ["build"], function() {
  browserSync(config);
});

gulp.task("clean", function() {
  rimraf(path.clean, cb);
});

gulp.task("default", ["build", "webserver", "watch"]);
