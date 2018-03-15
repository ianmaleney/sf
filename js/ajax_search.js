jQuery(function($) {
  var order = "DESC";
  var orderby = "date";
  var p, q, catQ;
  var reverse = document.querySelector(".c-results-sort__reverse");
  var catNameFilters = document.querySelectorAll(".category-name");
  var sortFilters = document.querySelectorAll(".c-results-sort");
  var archiveList = document.querySelector(".c-archive-list");
  var archiveWrapper = document.querySelector(".c-archive-wrapper");
  var archiveModules;
  var moduleCatch = function() {
    archiveModules = document.querySelectorAll(".c-archive-module");
  };
  var clearCat = function() {
    catNameFilters.forEach(function(el) {
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

  moduleCatch();

  var moduleSwap = function(cat) {
    archiveModules.forEach(function(el) {
      el.classList.remove("removed");
      if (!el.classList.contains(cat)) {
        el.classList.add("removed");
      }
    });
  };

  catNameFilters.forEach(function(el) {
    el.addEventListener("click", function() {
      clearCat();
      moduleCatch();
      var title = this.textContent;
      moduleSwap(title);
      p = el.parentNode;
      p.classList.add("selected");
    });
  });

  sortFilters.forEach(function(el, i) {
    el.addEventListener("click", function() {
      clearCat();
      clearSort();
      moduleCatch();
      this.classList.add("selected");
      q = document.getElementById("query").textContent;
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

      var data = {
        action: "filter",
        query: q,
        order: order,
        orderby: orderby
      };

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
            document.getElementById("query").innerHTML = q;
          } else {
            console.log("nodata");
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    });
  });

  reverse.addEventListener("click", function() {
    moduleCatch();
    if (order === "DESC") {
      order = "ASC";
    } else {
      order = "DESC";
    }
    q = document.getElementById("query").textContent;
    //catQ = document.querySelector(".selected .category-name").textContent;
    var data = {
      action: "filter",
      query: q,
      order: order,
      orderby: orderby
      //category_name: catQ
    };

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
          console.log("nodata");
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});
