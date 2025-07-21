// index.js

document.addEventListener('DOMContentLoaded', () => {
  // Initialize slideshow (intro)
  new Swiper('.intro-swiper', {
    loop: true,
    autoplay: {
      delay: 2500,
    },
    effect: 'fade',
  });

  // Initialize gallery swiper
  new Swiper('.gallery-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
      },
      1024: {
        slidesPerView: 3.5,
      }
    }
  });
  

  // Initialize team swiper
  new Swiper('.team-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.3,
      },
      600: {
        slidesPerView: 2.5,
      },
      900: {
        slidesPerView: 3.2,
      }
    }
  });
});
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key))) {
    e.preventDefault();
  }
});
