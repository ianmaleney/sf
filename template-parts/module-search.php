<div class="c-search-module">
  <div class="o-underlay--search"></div>
  <div class="c-search-form">
    <form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
      <label for="#primary-search">
        <input id="primary-search" type="search" placeholder="Type And Hit Enter" class="search-field c-search-form__input" value="<?php echo get_search_query(); ?>" name="s" />
        <input type="hidden" value="any" name="post_type" id="post_type" />
      </label>
      <!--<button type="submit" class="search-submit c-search-form__button">Go</button>-->
    </form>
  </div>
</div>
