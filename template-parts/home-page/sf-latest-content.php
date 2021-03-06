<div class="o-content-row o-content-row--basic">
  <div class="c-row-header">Most Recent</div>

<?php

$args = array(
  'numberposts' => 3,
  'orderby' => 'post_date',
	'order' => 'DESC',
  'category__not_in' => array(72, 168, 159, 1190, 1250)
);

$latestPosts = get_posts( $args );

if($latestPosts) {

	foreach($latestPosts as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "latest content" modules are created -->

  <div class="c-content-module c-content-module--basic">
    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
      <img class="c-content-image" data-src="<?php the_post_thumbnail_url( 'large' ); ?>">
    </a>
    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
      <div class="c-content-text--meta">
         <?php if ('page' != get_post_type()) { ?>
              <p class="c-content-type"><?php sf_single_cat() ?></p>
              <p class="sep">|</p>
            <?php } ?>
          <p class="c-content-author"><?php guest_author_link(); ?></p>
      </div>
      <p class="c-content-description"><?php the_field('lede'); ?></p>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
