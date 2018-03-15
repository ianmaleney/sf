jQuery(function($) {
  var order = "DESC";
  var orderby = "date";
  var q;
  var reverse = document.querySelector(".c-results-sort__reverse");
  var catNameFilters = document.querySelectorAll(".category-name");
  var authNameFilters = document.querySelectorAll(".author-name");
  var sortFilters = document.querySelectorAll(".c-results-sort");
  var archiveList = document.querySelector(".c-archive-list");
  var archiveWrapper = document.querySelector(".c-archive-wrapper");
  var showAll = document.getElementById("show_all");

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

  var dataSet = function() {
    q = document.getElementById("query").textContent;
    var catQ = document.querySelector(".selected .category-name");
    var cat_name;
    catQ ? (cat_name = catQ.textContent) : null;
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
    var cat_name = document.querySelector(".page-title").textContent;
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

  var ajaxRequest = function(data = dataSet()) {
    $.ajax({
      url: myAjax.ajaxurl, // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function(xhr) {
        spinner(archiveList);
        console.log(data);
      },
      success: function(data) {
        if (data) {
          archiveList.innerHTML = data;
        } else {
          console.log("nodata");
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
      ajaxRequest();
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

  showAll.addEventListener("click", function() {
    q ? clearCat() : clearAuth();
    q ? ajaxRequest() : ajaxRequest(authorQuery());
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
      q ? ajaxRequest() : ajaxRequest(authorQuery());
    });
  });

  reverse.addEventListener("click", function() {
    order === "DESC" ? (order = "ASC") : (order = "DESC");
    q ? ajaxRequest() : ajaxRequest(authorQuery());
  });
});
