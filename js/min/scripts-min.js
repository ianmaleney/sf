!function($){var s=$(".js-menu-show"),i=$(".js-menu-hide"),e=$(".o-underlay"),l=$(".js-side-nav-container"),a=$(".js-article__social-icons"),o=$(".js-social-expand"),c=$(".js-social-hidden");s.on("click",function(){l.addClass("side-nav--animatable"),l.toggleClass("side-nav--visible"),s.toggleClass("is-active"),e.addClass("side-nav--animatable"),e.toggleClass("side-nav--visible")}),i.on("click",function(){l.toggleClass("side-nav--visible"),e.toggleClass("side-nav--visible"),s.toggleClass("is-active")}),e.on("click",function(){l.toggleClass("side-nav--visible"),e.toggleClass("side-nav--visible"),s.toggleClass("is-active")}),$(window).scroll(function(){var s=$(window).scrollTop();s>40?$(".c-secondary-header").addClass("is-scrolling"):$(".c-secondary-header").removeClass("is-scrolling"),s>120?a.addClass("is-scrolling"):a.removeClass("is-scrolling")});var n=$(".c-primary-header__nav--menu li:last-child");n.html('<svg xmlns="http://www.w3.org/2000/svg" width="67" height="67" viewBox="0 0 67 67"><path fill-rule="evenodd" d="M49.96 45.73c-2.95-2.57-5.9-5.14-8.87-7.68-.5-.4-.6-.67-.3-1.25 1.22-2.44 1.6-5.04 1.14-7.74-1.06-6.46-7.06-11.23-13.4-10.68-7 .6-12.05 6-12.04 12.82.03 4.8 2.63 9.17 6.9 11.3 4.56 2.28 9 1.95 13.24-.86.56-.38.84-.33 1.3.1l9 7.8c.95.8 2 .85 2.87.18 1.5-1.15 1.57-2.76.14-4zm-20.5-5.22c-5.2 0-9.34-4.2-9.3-9.4.03-5.14 4.22-9.27 9.4-9.24 5.16.02 9.3 4.18 9.28 9.35 0 5.2-4.2 9.36-9.4 9.34z" clip-rule="evenodd"/></svg>'),n.addClass("search-item");var d=$(".c-side-nav__menu li:last-child");d.addClass("search-item"),$(".search-item, .o-underlay--search").on("click",function(){$(".c-search-module").toggleClass("visible"),$(".c-search-form__input").toggleClass("visible"),$(".c-search-form__input.visible").focus()}),o.on("click",function(){o.toggleClass("social-visible"),c.toggleClass("social-visible")}),$(".woocommerce-store-notice__dismiss-link").on("click",function(){$(".woocommerce-store-notice").hide()})}(jQuery);