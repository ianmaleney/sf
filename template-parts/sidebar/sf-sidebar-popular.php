<div class="c-sidebar-section c-sidebar-section--popular">

  <h4 class="c-sidebar-section__title">Most Popular</h4>

  <?php $popular = new WP_Query(array(
    'posts_per_page'=>3,
    'meta_key'=>'popular_posts',
    'orderby'=>'meta_value_num',
    'order'=>'DESC'));

	while ($popular->have_posts()) : $popular->the_post(); ?>

  <div class="c-sidebar-section__item">
    <a href="<?php the_permalink(); ?>">
      <img class="c-sidebar-section__item--thumb" src="<?php the_post_thumbnail_url( 'thumbnail' ); ?>">
    </a>
    <div class="c-sidebar-section__item--info">
      <a href="<?php the_permalink(); ?>" class="c-sidebar-section__item--title"><?php the_title(); ?></a>
      <p class="c-sidebar-section__item--author"><?php guest_author_link(); ?></p>
      <p class="c-sidebar-section__item--date"><?php the_date('d/m/y'); ?></p>
    </div>
  </div>

	<?php endwhile; wp_reset_postdata(); ?>

</div>
