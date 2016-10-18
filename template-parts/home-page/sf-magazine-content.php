<div class="o-content-row o-content-row--featured">
  <div class="c-row-header">Magazine</div>

<?php

$args = array(
  'sort_order' => 'asc',
	'sort_column' => 'post_date',
	'hierarchical' => 0,
	'parent' => 152,
	'number' => 1,
);

$featuredPosts = get_pages( $args );

if($featuredPosts) {

	foreach($featuredPosts as $post) : setup_postdata( $post ); ?>

  <!-- This is where the featured content modules are created -->

  <div class="c-content-module c-content-module--featured">

    <div class="books-image">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener">
        <img src="<?php the_field('book_cover'); ?>">
      </a>
    </div>

    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener" class="c-content-title"><?php the_title(); ?></a>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
