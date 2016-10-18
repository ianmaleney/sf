<div class="o-content-row o-content-row--half-width c-content-row--books">
  <div class="c-row-header">Subscribe</div>

<?php

$args = array(
  'sort_order' => 'asc',
	'sort_column' => 'post_date',
	'hierarchical' => 0,
	'parent' => 152,
	'number' => 1,
);

$latestBook = get_pages( $args );

if($latestBook) {

	foreach($latestBook as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "news content" modules are created -->

  <div class="c-content-module c-content-module--books">

    <div class="books-image">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener">
        <img src="<?php the_field('book_cover'); ?>">
      </a>
    </div>

    <div class="books-info">
      <?php
        $subs = get_page_by_title( 'Subscribe' );
        $subLink = get_page_uri($subs);
        echo '<p class="heading-3"><a href="'. $subLink .'" target="_blank" rel="noopener">Get <i>The Stinging Fly</i> delivered to your door, three times a year.</a></p>';
      ?>
    </div>

  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
