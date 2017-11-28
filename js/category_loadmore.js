jQuery(function($) {
  $(".c-button__loadmore").click(function() {
	  
    var button = $(this),
      data = {
        action: "loadmore",
        query: misha_loadmore_params.posts, // that's how we get params from wp_localize_script() function
        page: misha_loadmore_params.current_page
      };
    
    var mult = (12 * misha_loadmore_params.current_page) + 1;
    
    $.ajax({
      url: misha_loadmore_params.ajaxurl, // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function(xhr) {
		 
        button.text("Loading..."); // change the button text, you can also add a preloader image
      },
      success: function(data) {
        if (data) {
          button
            .text("More posts")
            .prev()
            .append(data); // insert new posts
          misha_loadmore_params.current_page++;
          var classes = ['two-one', 'four-two', 'three-three', 'six-two', 'four-one' ];
          var modArray = [];
          var modules = document.querySelectorAll(".c-archive-module");
          modules.forEach(function(el){
            modArray.push(el);
          })
          
          modArray.splice(0, mult);
          modArray.forEach(function(el, i){
            if (i === 1 || i === 2){
              el.classList.add(classes[1]);
            }
            if (i === 3 || i === 4 || i === 6 || i === 8 ){
              el.classList.add(classes[0]);
            }
            if (i === 5 || i === 7 ) {
              el.classList.add(classes[4]);
            }
            if (i === 0 || i === 9) {
              el.classList.add(classes[3]);
            }
            if (i === 10|| i === 11){
              el.classList.add(classes[2]);
            }
          });

          var lengthCheck = function() {
            titles = document.querySelectorAll(".c-archive-module__title");
            titles.forEach(function(el) {
              var string = el.innerHTML;
              var length = string.length;
              if (length > 40) {
                console.log(length);
                var str2 = string.slice(0, 37);
                var newTitle = str2 + "...";
                el.innerHTML = newTitle;
              }
            });
          };

          lengthCheck();

          if (
            misha_loadmore_params.current_page == misha_loadmore_params.max_page
          )
            button.remove(); // if last page, remove the button
        } else {
          button.remove(); // if no data, remove the button as well
        }
      }
    });
  });
});
