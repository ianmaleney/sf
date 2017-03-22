<div class="o-content-row o-content-row--half-width o-content-row--news">
  <div class="c-row-header">Events</div>
  <div class="news__wrapper">

<?php

$args = array(
  'numberposts' => 3,
  'post_type' => 'events',
  'orderby' => 'post_date',
  'order' => 'DESC'
);

$eventsPosts = get_posts( $args );

if($eventsPosts) {

	foreach($eventsPosts as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "news content" modules are created -->

  <div class="news-module">
    <div class="news-text">
      <a href="<?php the_permalink(); ?>" class="news-title"><?php the_title(); ?></a>
      <div class="news-info">
        <p class="news-type"><?php sf_single_cat(); ?></p>
        <p class="news-time"><?php the_date(); ?></p>
      </div>
    </div>
    <div class="news-module__image"><img src="<?php the_post_thumbnail_url( 'thumbnail' ); ?>"></div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
</div>
