<div class="c-sidebar-section c-sidebar-section--newsletter">

  <div>
    <h4 class="c-sidebar-section__title">Newsletter</h4>
    <div class="c-sidebar-section__input">
      <input placeholder="Email..." class="o-input c-form-input">
      <button class="o-button c-form-button">Sign Up</button>
    </div>
  </div>

  <div class="c-sidebar-item--magazine">
    <h4 class="c-sidebar-section__title">The Magazine</h4>
    <div class="c-sidebar-item--mag-cover">
      <?php

      $args = array(
        'numberposts' => 1,
        'post_type' => 'product',
        'product_cat' => 'magazine'
      );

      $magazine = get_posts( $args );

      if($magazine) {

      	foreach($magazine as $post) : setup_postdata( $post ); ?>
      <a href="<?php the_permalink(); ?>">
        <img src="<?php the_post_thumbnail_url( 'thumb' ); ?>">
      </a>
    </div>
    <a href="<?php the_permalink(); ?>" class="c-sidebar-item--mag-title"><?php the_title(); ?></a>
  <?php endforeach;
    wp_reset_postdata();
    };
  ?>
  </div>

</div>
