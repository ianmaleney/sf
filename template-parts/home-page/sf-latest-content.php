<div class="o-content-row o-content-row--basic">
  <div class="c-row-header">Most Recent</div>

<?php

$args = array(
  'numberposts' => 3,
  'orderby' => 'post_date',
	'order' => 'DESC',
  'category__not_in' => array(72, 168, 159)
);

$latestPosts = get_posts( $args );

if($latestPosts) {

	foreach($latestPosts as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "latest content" modules are created -->

  <div class="c-content-module c-content-module--basic">
    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
    </a>
    <div class="c-content-text">
      <p class="c-content-type"><?php sf_single_cat(); ?></p>
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
      <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
      <p class="c-content-description"><?php the_field('lede'); ?></p>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
