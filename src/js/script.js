var slider1 = document.querySelector(".testimonials__slider:first-child");
var slider2 = document.querySelector(".testimonials__slider:nth-child(2)");
var slider3 = document.querySelector(".testimonials__slider:nth-child(3)");
var btn1 = document.querySelector(".testimonials__btn:first-child");
var btn2 = document.querySelector(".testimonials__btn:nth-child(2)");
var btn3 = document.querySelector(".testimonials__btn:nth-child(3)");

btn1.addEventListener("click", function () {
  if (btn1.classList.contains("testimonials__btn")) {
      btn1.classList.add("btn-active");
      btn2.classList.remove("btn-active");
      btn3.classList.remove("btn-active");
      slider1.classList.remove("visually-hidden");
      slider2.classList.add("visually-hidden");
      slider3.classList.add("visually-hidden");
  }
});

btn2.addEventListener("click", function () {
  if (btn2.classList.contains("testimonials__btn")) {
      btn2.classList.add("btn-active");
      btn1.classList.remove("btn-active");
      btn3.classList.remove("btn-active");
      slider2.classList.remove("visually-hidden");
      slider1.classList.add("visually-hidden");
      slider3.classList.add("visually-hidden");
  }
});

btn3.addEventListener("click", function () {
  if (btn3.classList.contains("testimonials__btn")) {
      btn3.classList.add("btn-active");
      btn1.classList.remove("btn-active");
      btn2.classList.remove("btn-active");
      slider3.classList.remove("visually-hidden");
      slider1.classList.add("visually-hidden");
      slider2.classList.add("visually-hidden");
  }
});
