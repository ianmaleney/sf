<div class="o-content-row o-content-row--half-width c-content-row--books">
  <div class="c-row-header">Subscribe</div>

<?php

$args = array(
  'numberposts' => 1,
  'post_type'   => 'product',
  'product_cat' => 'magazine',
  'meta_key'		=> 'date_published',
  'orderby'     => 'meta_value_num',
  'order'       => 'DESC',
);

$magazine = get_posts( $args );

if($magazine) {

	foreach($magazine as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "news content" modules are created -->

  <div class="c-content-module c-content-module--books">

    <div class="books-image c-home-sub__image">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener">
        <img src="<?php the_post_thumbnail_url( 'medium' ); ?>">
      </a>
    </div>

    <div class="books-info c-home-sub__info">
      <a href="<?php $url = home_url('/product/subscription-one-year-three-issues/'); echo $url; ?>" target="_blank" rel="noopener">Subscribe now and receive access to the <i>Stinging Fly</i> online archive.</a>
    </div>

  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
