<div class="o-content-row o-content-row--half-width c-content-row--books">
  <div class="c-row-header">Books</div>

<?php

$args = array(
	'post_type' => 'product',
  'product_cat' => 'book',
  'posts_per_page' => 1,
  'meta_key'			=> 'date_published',
  'orderby'        => 'meta_value_num',
  'order'          => 'DESC',
);

$latestBook = get_posts( $args );

if($latestBook) {

	foreach($latestBook as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "book content" module is created -->

  <div class="c-content-module c-content-module--books">

    <div class="books-image">
      <a href="<?php the_permalink(); ?>">
        <img src="<?php the_field('book_cover'); ?>">
      </a>
    </div>

    <div class="books-info">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener" class="books-title"><?php the_title(); ?></a>
      <p class="books-author"><i>by</i> <?php the_field('author') ?></p>
      <?php if (get_the_field('blurb_quote')) { ?>
         <p class="books-description"><?php the_field('blurb_quote'); ?> — <?php the_field('blurb_attribution'); ?></p>
      <?php } ?>
     
    </div>

    <div class="books-extra">
      <div class="o-button c-books-button">
        <a href="<?php $bookIndex = get_page_by_title( 'Books' ); $link = get_page_uri($bookIndex); echo $link ?>" target="_blank" rel="noopener">More Books</a>
      </div>
    </div>

  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
