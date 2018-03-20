jQuery(function($) {
  var order = "DESC";
  var orderby = "date";
  var q = document.getElementById("query").textContent;
  var reverse = document.querySelector(".c-results-sort__reverse");
  var catNameFilters = document.querySelectorAll(".category-name");
  var authNameFilters = document.querySelectorAll(".author-name");
  var sortFilters = document.querySelectorAll(".c-results-sort");
  var archiveList = document.querySelector(".c-archive-list");
  var archiveWrapper = document.querySelector(".c-archive-wrapper");
  var showAll = document.getElementById("show_all");

  if (document.body.classList.contains("search-results")) {
    var isSearch = true;
  } else {
    var isSearch = false;
  }

  var clearCat = function() {
    catNameFilters.forEach(function(el) {
      p = el.parentNode;
      p.classList.remove("selected");
    });
  };
  var clearAuth = function() {
    authNameFilters.forEach(function(el) {
      p = el.parentNode;
      p.classList.remove("selected");
    });
  };
  var clearSort = function() {
    sortFilters.forEach(function(el) {
      el.classList.remove("selected");
    });
  };
  var spinner = function(el) {
    var loader = document.createElement("div");
    loader.classList.add("loader");
    loader.innerHTML = "Loading...";
    el.innerHTML = "";
    el.appendChild(loader);
  };

  var categoryQuery = function() {
    var catQ = document.querySelector(".selected .category-name");
    var cat_name;
    catQ ? (cat_name = catQ.textContent) : q;
    var data = {
      action: "filter",
      query: q,
      order: order,
      orderby: orderby,
      category_name: cat_name
    };
    return data;
  };

  var authorQuery = function() {
    var auth_name = document.querySelector(".selected .author-name");
    var cat_name = q;
    auth_name ? (auth_name = auth_name.textContent) : (auth_name = "");
    var auth_name_clean = auth_name.replace(/['"’.]+/g, " ");
    var data = {
      action: "filter",
      query: auth_name_clean,
      order: order,
      orderby: orderby,
      category_name: cat_name,
      sentence: true
    };
    return data;
  };

  var errorMessage = function(el) {
    var errMess = document.createElement("div");
    var errMesTitle = document.createElement("h2");
    errMesTitle.innerHTML =
      "Sorry, we could not find any posts that matched your query.";
    errMess.appendChild(errMesTitle);
    errMess.classList.add("search-error-message");
    el.appendChild(errMess);
  };

  var ajaxRequest = function(data) {
    $.ajax({
      url: myAjax.ajaxurl, // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function(xhr) {
        spinner(archiveList);
      },
      success: function(data) {
        if (data) {
          archiveList.innerHTML = data;
        } else {
          errorMessage(archiveList);
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  };

  catNameFilters.forEach(function(el) {
    el.addEventListener("click", function() {
      clearCat();
      var p = this.parentNode;
      p.classList.add("selected");
      ajaxRequest(categoryQuery());
    });
  });

  authNameFilters.forEach(function(el) {
    el.addEventListener("click", function() {
      clearAuth();
      var p = this.parentNode;
      p.classList.add("selected");
      ajaxRequest(authorQuery());
    });
  });

  var show = function(num) {
    switch (num) {
      case 0:
        clearCat();
        ajaxRequest(categoryQuery());
        break;
      case 1:
        clearAuth();
        ajaxRequest(authorQuery());
        break;
    }
  };

  showAll.addEventListener("click", function() {
    isSearch ? show(0) : show(1);
  });

  sortFilters.forEach(function(el, i) {
    el.addEventListener("click", function() {
      clearSort();
      this.classList.add("selected");
      switch (i) {
        case 0:
          orderby = "date";
          break;
        case 1:
          orderby = "title";
          break;
        case 2:
          orderby = "relevance";
          break;
      }
      isSearch ? ajaxRequest(categoryQuery()) : ajaxRequest(authorQuery());
    });
  });

  reverse.addEventListener("click", function() {
    order === "DESC" ? (order = "ASC") : (order = "DESC");
    isSearch ? ajaxRequest(categoryQuery()) : ajaxRequest(authorQuery());
  });
});
