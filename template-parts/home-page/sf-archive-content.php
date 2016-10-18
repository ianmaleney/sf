<div class="o-content-row o-content-row--basic">
  <div class="c-row-header">From the Archives</div>

<?php

$args = array(
  'numberposts' => 3,
  'orderby' => 'rand',
  'date_query' => array(
        'before' => date('Y-m-d h:i',time() - 60 * 60 * 24 * 365 ))
);

$archivePosts = get_posts( $args );

if($archivePosts) {

	foreach($archivePosts as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "archive content" modules are created -->

  <div class="c-content-module c-content-module--basic">
    <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener" class="c-content-image-link">
      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
    </a>
    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener" class="c-content-title"><?php the_title(); ?></a>
      <p class="c-content-type"><?php the_category( ' ' ); ?></p>
      <p class="c-content-author"><?php guest_author_link(); ?></p>
      <p class="c-content-description"><?php the_field('lede'); ?></p>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
