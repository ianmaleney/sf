<nav class="o-search-nav o-search-nav--archive">
	<h1 class="heading-1 c-search-nav__heading">
    <?php
      if(is_search()) {
        echo 'Search';
      } else {
          cat_name();
      }
    ?>
  </h1>
  <p class="c-search-nav__description"><?php
    if(is_search()) {
      printf( __( 'Showing Search Results for: %s', 'twentysixteen' ), '<span> "' . esc_html( get_search_query() ) . '"</span></br></br>' );
    }?>
    Search These Results:</p>
	<div class="o-search-input-group">

		<div class="c-search-input">
			<form class="c-search-input__form">
				<label for=".c-search-input__author"><!--<span>Search by Author:</span>-->
				<input type="search" class="search-field c-search-input__author"
				value="<?php echo get_search_query() ?>" name="s"
				title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>">
        <!--<input type="hidden" value="<?php echo get_search_query() ?>" name="author" id="author">-->
				</label>
				<button type="submit" class="o-button c-search-input__button">Search</button>
			</form>
		</div>
    <!--
    <div class="c-search-input">
			<form>
				<label for=".c-search-input__year"><span>Select by Date:</span>
				<input type="month" class="c-search-input__year"
					value="<?php echo get_search_query() ?>" name="s"
					title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>">
				</label>
				<input type="submit" class="o-button c-search-input__button">
			</form>
		</div>

		<div class="c-search-input">
			<form>
				<label for=".c-search-input__issue"><span>Search by Issue:</span>
				<input type="number" class="c-search-input__issue"
				value="<?php echo get_search_query() ?>" name="s"
				title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>">
				</label>
				<input type="submit" class="o-button c-search-input__button">
			</form>
		</div>

		<div class="c-search-input">
			<form>
				<label for=".c-search-input__category"><span>Search by Category:</span>
				<input type="field" class="c-search-input__category"
				value="<?php echo get_search_query() ?>" name="s"
				title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>">
				</label>
				<input type="submit" class="o-button c-search-input__button">
			</form>
		</div>
  -->
    <p class="c-search-nav__description"><i>Or</i></p>
		<button class="o-button">Browse All Issues</button>
	</div>
</nav>
