<div class="o-content-row o-content-row--featured o-content-row--magazine">
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

  <div class="c-content-module c-content-module--featured c-content-module--magazine">

    <div class="c-mag-home-title">
      <h2>In the latest issue:</h2>
    </div>

    <div class="books-image">
      <a href="<?php the_permalink(); ?>">
        <img src="<?php the_field('book_cover'); ?>">
      </a>
    </div>

    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
