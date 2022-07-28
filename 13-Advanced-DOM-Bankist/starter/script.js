'use strict';
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav')

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => { btn.addEventListener('click', openModal) })
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scrolling 
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current Scroll', window.pageXOffset, window.pageYOffset);
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  // window.scrollTo({
  //   left : s1coords.left + window.pageXOffset,
  //   top:  s1coords.top + window.pageYOffset,
  //   behavior:'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigation
// document.querySelectorAll('.nav__link').forEach(function(el){el.addEventListener('click',function(e){
//   e.preventDefault();
//   const id = this.getAttribute('href');
//   console.log(id);
//   document.querySelector(id).scrollIntoView({behavior:'smooth'}); 
// })})

// event delegation 
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
})

// Menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link)
        el.style.opacity = this;
    });
    logo.style.opacity = this;
  };
}
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// mouseenter does not bubble  <> mouseleave
// mouseover does bubble <> mouseout

// Sticky navigation 
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll',function(e){
//   console.log(window.scrollY);
//   if(window.scrollY > initialCoords.top)
//   nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API
// const obsCallBack = function(entries, observer){
//   entries.forEach(entry => {console.log(entry);})
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header)

// reveal sections 
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {

  const [entry] = entries;
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})
allSections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden');  
})

// lazy loading images 
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

imgTargets.forEach(function (img) {
  imgObserver.observe(img)
})

// slider component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      ))
  }
  createDots();

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }

  const goToSlide = function (slide) {
    slides.forEach((s, i) => { s.style.transform = `translateX(${100 * (i - slide)}%)` })
  }

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = function () {
    activateDot(0);
    goToSlide(0)
  }
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e.key);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  })

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  })
}
slider();

// document.addEventListener('DOMContentLoaded',function(e){
//   console.log('hii',e);
// })

// window.addEventListener('load',function(e){
// console.log('full loads');
// })

// window.addEventListener('beforeunload',function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })

// create
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookie for improved functionality and analytics.<button class="btn btn--close-cookie"> Got It! </button>';

// insert
// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true)); 
// header.before(message);
// header.after(message);

// delete
// document.querySelector(".btn--close-cookie").addEventListener('click', function () {
//   message.remove();
// });

// style
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.height = '89px';

// attribute 
// console.log(message.style.backgroundColor);
// // console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(message.style.height)
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// events 
// const alertH1 = function (e) {
//   alert('hiii');
// }
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',alertH1);
// setTimeout(()=> h1.removeEventListener('mouseenter',alertH1),3000);
// addEventListener (mousenenter) use
// removeEventListner
// onclick, onmouseenter.... dont use

// bubbling and capturing

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // stop propagation
//   // e.stopPropagation();
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target);
// })

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target);
// })