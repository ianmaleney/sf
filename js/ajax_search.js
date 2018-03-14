jQuery(function($) {
  var order = "DESC";
  var orderby = "date";
  var q;
  var catNameFilters = document.querySelectorAll(".category-name");
  var sortFilters = document.querySelectorAll(".c-results-sort");
  var reverse = document.querySelector(".c-results-sort__reverse");
  var archiveList = document.querySelector(".c-archive-list");
  var archiveModules = document.querySelectorAll(".c-archive-module");

  var moduleSwap = function(cat) {
    archiveModules.forEach(function(el) {
      el.classList.remove("removed");
      if (!el.classList.contains(cat)) {
        el.classList.add("removed");
        console.log(cat);
      }
    });
  };

  catNameFilters.forEach(function(el) {
    el.addEventListener("click", function() {
      console.log("click");
      var title = this.textContent;
      moduleSwap(title);
    });
  });

  sortFilters.forEach(function(el, i) {
    el.addEventListener("click", function() {
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

      var data = { action: "filter", query: q, order: order, orderby: orderby };

      $.ajax({
        url: myAjax.ajaxurl, // AJAX handler
        data: data,
        type: "POST",
        beforeSend: function(xhr) {
          console.log(data);
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

  reverse.addEventListener("click", function() {
    if (order === "DESC") {
      order = "ASC";
    } else {
      order = "DESC";
    }
    q = document.getElementById("query").textContent;
    var data = { action: "filter", query: q, order: order, orderby: orderby };

    $.ajax({
      url: myAjax.ajaxurl, // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function(xhr) {
        console.log(data);
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
