(function($) {
  var showNav = $(".js-menu-show");
  var hideNav = $(".js-menu-hide");
  var underlay = $(".o-underlay");
  var sideNav = $(".js-side-nav-container");

  var socialIcons = $(".js-article__social-icons");
  var socialPlus = $(".js-social-expand");
  var socialHidden = $(".js-social-hidden");

  showNav.on("click", function() {
    sideNav.addClass("side-nav--animatable");
    sideNav.toggleClass("side-nav--visible");
    showNav.toggleClass("is-active");
    underlay.addClass("side-nav--animatable");
    underlay.toggleClass("side-nav--visible");
  });

  hideNav.on("click", function() {
    sideNav.toggleClass("side-nav--visible");
    underlay.toggleClass("side-nav--visible");
    showNav.toggleClass("is-active");
  });

  underlay.on("click", function() {
    sideNav.toggleClass("side-nav--visible");
    underlay.toggleClass("side-nav--visible");
    showNav.toggleClass("is-active");
  });

  $(window).scroll(function() {
    var height = $(window).scrollTop();

    if (height > 40) {
      $(".c-secondary-header").addClass("is-scrolling");
    } else {
      $(".c-secondary-header").removeClass("is-scrolling");
    }

    if (height > 120) {
      socialIcons.addClass("is-scrolling");
    } else {
      socialIcons.removeClass("is-scrolling");
    }
  });

  var homeSearch = $(".c-primary-header__nav--menu li:last-child");
  homeSearch.html(
    '<svg xmlns="http://www.w3.org/2000/svg" width="67" height="67" viewBox="0 0 67 67"><path fill-rule="evenodd" d="M49.96 45.73c-2.95-2.57-5.9-5.14-8.87-7.68-.5-.4-.6-.67-.3-1.25 1.22-2.44 1.6-5.04 1.14-7.74-1.06-6.46-7.06-11.23-13.4-10.68-7 .6-12.05 6-12.04 12.82.03 4.8 2.63 9.17 6.9 11.3 4.56 2.28 9 1.95 13.24-.86.56-.38.84-.33 1.3.1l9 7.8c.95.8 2 .85 2.87.18 1.5-1.15 1.57-2.76.14-4zm-20.5-5.22c-5.2 0-9.34-4.2-9.3-9.4.03-5.14 4.22-9.27 9.4-9.24 5.16.02 9.3 4.18 9.28 9.35 0 5.2-4.2 9.36-9.4 9.34z" clip-rule="evenodd"/></svg>'
  );
  homeSearch.addClass("search-item");

  var sideSearch = $(".c-side-nav__menu li:last-child");
  sideSearch.addClass("search-item");

  $(".search-item, .o-underlay--search").on("click", function() {
    $(".c-search-module").toggleClass("visible");
    $(".c-search-form__input").toggleClass("visible");
    $(".c-search-form__input.visible").focus();
  });

  socialPlus.on("click", function() {
    socialPlus.toggleClass("social-visible");
    socialHidden.toggleClass("social-visible");
  });

  $(".woocommerce-store-notice__dismiss-link").on("click", function() {
    $(".woocommerce-store-notice").hide();
  });
})(jQuery);
