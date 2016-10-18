<div class="c-sidebar-section c-sidebar-section--latest">

  <h4 class="c-sidebar-section__title">Most Recent</h4>

  <?php

  $args = array(
    'numberposts' => 3,
    'orderby' => 'post_date',
    'order' => 'DESC'
  );

  $latestPosts = get_posts( $args );

  if($latestPosts) {

    foreach($latestPosts as $post) : setup_postdata( $post ); ?>


  <div class="c-sidebar-section__item">
    <a href="<?php the_permalink(); ?>" class="c-sidebar-section__item--title"><?php the_title(); ?></a>
    <p class="c-sidebar-section__item--author"><?php the_field('Author'); ?></p>
    <p class="c-sidebar-section__item--date"><?php the_date(); ?></p>
  </div>

<?php endforeach;
wp_reset_postdata();
};

?>

</div>
