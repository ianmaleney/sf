<div class="o-content-row o-content-row--featured o-content-row--magazine">
  <div class="c-row-header">Magazine</div>

<?php

$args = array(
  'numberposts' => 1,
  'post_type' => 'product',
  'product_cat' => 'magazine'
);

$magazine = get_posts( $args );

if($magazine) {

	foreach($magazine as $post) : setup_postdata( $post ); ?>

  <!-- This is where the featured content modules are created -->

  <div class="c-content-module c-content-module--magazine">

    <!--<div class="c-mag-home__section-title">
      <h2>In the latest issue:</h2>
    </div>-->

<<<<<<< HEAD
    <div class="books-image">
      <a href="<?php the_permalink(); ?>">
        <img src="<?php the_field('book_cover'); ?>">
      </a>
    </div>

    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
=======
    <div class="c-mag-home__image">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener">
        <img src="<?php the_post_thumbnail_url( 'large' ); ?>">
      </a>
    </div>

    <div class="c-mag-home__text">

      <div class="c-mag-home__issue-title">
        <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener"><?php the_title(); ?></a>
      </div>

      <div class="c-mag-home__issue-contents">
        <p><?php the_field('magazine_description'); ?></p>
      </div>
      <div class="c-mag-home__button-wrapper">
        <div class="o-button c-mag-home__button c-mag-home__button--see-more">
          <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener">Find Out More</a>
        </div>
        <div class="o-button c-mag-home__button c-mag-home__button--subscribe-now">
          <a href="<?php $subs = get_page_by_title( 'Subscribe' );
          $subLink = get_page_uri($subs); echo $subLink ?>" target="_blank" rel="noopener">Subscribe Now</a>
        </div>
     </div>
>>>>>>> master
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
