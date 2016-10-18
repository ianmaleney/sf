<div class="o-content-row o-content-row--featured">
  <div class="c-row-header">Featured</div>

<?php

$args = array(
  'numberposts' => 3,
	'meta_key' => 'featured_content',
	'meta_value' => true
);

$featuredPosts = get_posts( $args );

if($featuredPosts) {

	foreach($featuredPosts as $post) : setup_postdata( $post ); ?>

  <!-- This is where the featured content modules are created -->

  <div class="c-content-module c-content-module--featured">
    <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener" class="c-content-image-link">
      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'large' ); ?>">
    </a>
    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener" class="c-content-title"><?php the_title(); ?></a>
      <p class="c-content-type"><?php the_category(', ' ); ?></p>
      <p class="c-content-author"><?php guest_author_link(); ?></p>
      <p class="c-content-description"><?php the_field('lede'); ?></p>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
