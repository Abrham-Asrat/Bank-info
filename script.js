"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");

const section1 = document.querySelector("#section--1");

const nav = document.querySelector(".nav");

// for preparing tab component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const dotContainer = document.querySelector(".dots");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FIXME:- Implementing smooth scrolling💥
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FIXME Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);

// by keyBoard
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////
//////FIXME: BUIlding a tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // guard clause
  if (!clicked) return;
  tabs.forEach((e) => e.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  // activate content
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/////////////////////////////////////////
///FIXME passing arguments to event handlers
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    // console.log("mouseover");
    // e.target.style.opacity = 0.5;
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((e) => {
      if (e !== link) {
        e.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/////////FIXME A sticky navigation by intersection observer API

// A sticky navigation// 💥

const header = document.querySelector(".header");
const stickyNav = function (entires) {
  const [entry] = entires;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const navHeight = nav.getBoundingClientRect();

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`, // negative value for top margin
});

headerObserver.observe(header);

const allSections = document.querySelectorAll(".section");

const hiddenSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    entry.target.classList.add("section--hidden");
  } else {
    entry.target.classList.remove("section--hidden");
  }
};
const sectionRemover = new IntersectionObserver(hiddenSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (hidden) {
  sectionRemover.observe(hidden);
  hidden.classList.add("section--hidden");
});

const lazyImage = document.querySelectorAll("img[data-src]");
const imgFunction = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};
const imgObserver = new IntersectionObserver(imgFunction, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

lazyImage.forEach((imgs) => imgObserver.observe(imgs));
const slideAll = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
let maxSlide = slideAll.length;

const createDots = function () {
  slideAll.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const dotActivate = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((e) => e.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

// goto slide
const gotoSlide = function (s) {
  slideAll.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - s)}%)`)
  );
};
gotoSlide(0);
// shift to next slide
const rightSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
  dotActivate(curSlide);
};
const leftSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  gotoSlide(curSlide);
  dotActivate(curSlide);
};
btnRight.addEventListener("click", rightSlide);
// shift to prev slide
btnLeft.addEventListener("click", leftSlide);

// work by right and left arrow keyBoard keys
document.addEventListener("keydown", function (e) {
  // console.log(e);
  if (e.key === "ArrowRight") rightSlide();
  if (e.key === "ArrowLeft") leftSlide();
});

//💥 dots slide functionality

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    dotActivate(slide);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TODO : Selecting , creating and deleting elements
