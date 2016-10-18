<div class="o-content-row o-content-row--half-width c-content-row--books">
  <div class="c-row-header">Books</div>

<?php

$args = array(
  'sort_order' => 'asc',
	'sort_column' => 'post_date',
	'hierarchical' => 0,
	'parent' => 149,
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
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener" class="books-title"><?php the_title(); ?></a>
      <p class="books-author"><?php guest_author_link(); ?></a>
      <p class="books-description"><?php the_field('blurb_quote'); ?> — <?php the_field('blurb_attribution'); ?></p>
    </div>

    <div class="books-extra">
      <?php
        $bookIndex = get_page_by_title( 'Books' );
        $link = get_page_uri($bookIndex);
        echo '<a href="'. $link .'" target="_blank" rel="noopener">More Books...</a>';
      ?>
    </div>

  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
