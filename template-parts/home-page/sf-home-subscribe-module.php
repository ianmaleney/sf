<div class="o-content-row o-content-row--half-width c-content-row--books">
  <div class="c-row-header">Subscribe</div>

<?php

$args = array(
  'numberposts' => 1,
  'post_type' => 'product',
  'product_cat' => 'magazine'
);

$magazine = get_posts( $args );

if($magazine) {

	foreach($magazine as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "news content" modules are created -->

  <div class="c-content-module c-content-module--books">

<<<<<<< HEAD
    <div class="books-image">
      <a href="<?php the_permalink(); ?>">
        <img src="<?php the_field('book_cover'); ?>">
      </a>
    </div>

    <div class="books-info">
      <?php
        $subs = get_page_by_title( 'Subscribe' );
        $subLink = get_page_uri($subs);
        echo '<p class="heading-3"><a href="'. $subLink .'">Get <i>The Stinging Fly</i> delivered to your door, three times a year.</a></p>';
      ?>
=======
    <div class="books-image c-home-sub__image">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener">
        <img src="<?php the_post_thumbnail_url( 'medium' ); ?>">
      </a>
    </div>

    <div class="books-info c-home-sub__info">
      <a href="<?php $subs = get_page_by_title( 'Subscribe' );
      $subLink = get_page_uri($subs); echo $subLink ?>" target="_blank" rel="noopener">Get <i>The Stinging Fly</i> delivered to your door, three times a year — Subscribe Now!</a>
>>>>>>> master
    </div>

  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
