/* ===================================================================
 * MATBOL - Main JS
 * Basado en Mueller 1.0.0
 * =================================================================== */

(function(html) {
    'use strict';

    const cfg = {
        mailChimpURL : ''
    };

    /* preloader */
    const ssPreloader = function() {
        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        html.classList.add('ss-preload');
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });
    };

    /* move header */
    const ssMoveHeader = function () {
        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;
        if (!(hdr && hero)) return;
        setTimeout(function() { triggerHeight = hero.offsetHeight - 170; }, 300);
        window.addEventListener('scroll', function () {
            let loc = window.scrollY;
            if (loc > triggerHeight) hdr.classList.add('sticky');
            else hdr.classList.remove('sticky');
            if (loc > triggerHeight + 20) hdr.classList.add('offset');
            else hdr.classList.remove('offset');
            if (loc > triggerHeight + 150) hdr.classList.add('scrolling');
            else hdr.classList.remove('scrolling');
        });
    };

    /* mobile menu */
    const ssMobileMenu = function() {
        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');
        if (!(toggleButton && mainNavWrap)) return;
        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });
        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });
        window.addEventListener('resize', function() {
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });
    };

    /* scroll spy */
    const ssScrollSpy = function() {
        const sections = document.querySelectorAll('.target-section');
        window.addEventListener('scroll', navHighlight);
        function navHighlight() {
            let scrollY = window.pageYOffset;
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');
                const navLink = document.querySelector('.s-header__nav a[href*=' + sectionId + ']');
                if (!navLink) return;
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.parentNode.classList.add('current');
                } else {
                    navLink.parentNode.classList.remove('current');
                }
            });
        }
    };

    /* swiper */
    const ssSwiper = function() {
        if (typeof Swiper === 'undefined') return;
        const testimonialsSwiper = new Swiper('.s-testimonials__slider', {
            slidesPerView: 1,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                401: { slidesPerView: 1, spaceBetween: 20 },
                801: { slidesPerView: 2, spaceBetween: 50 },
                1181: { slidesPerView: 3, spaceBetween: 50 }
            }
        });
    };

    /* back to top */
    const ssBackToTop = function() {
        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");
        if (!goTopButton) return;
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");
        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if (!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });
    };

    /* smoothscroll */
    const ssMoveTo = function(){
        if (typeof MoveTo === 'undefined') return;
        const easeFunctions = {
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        };
        const triggers = document.querySelectorAll('.smoothscroll');
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);
        triggers.forEach(function(trigger) { moveTo.registerTrigger(trigger); });
    };

    /* init */
    (function ssInit() {
        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssSwiper();
        ssBackToTop();
        ssMoveTo();
    })();

})(document.documentElement);