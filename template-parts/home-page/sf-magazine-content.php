<div class="o-content-row o-content-row--featured o-content-row--magazine">
  <div class="c-row-header">Magazine</div>

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

  <div class="c-content-module c-content-module--magazine">

    <div class="c-mag-home__image">
      <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener">
        <img data-src="<?php the_post_thumbnail_url( 'large' ); ?>">
      </a>
    </div>

    <div class="c-mag-home__text--wrapper">
      <div class="c-mag-home__text">
        <p class="c-mag-issue">
          <?php the_field('issue_volume'); ?>
        </p>
        <div class="c-mag-home__issue-title">
          <a href="<?php the_permalink(); ?>" target="_blank" rel="noopener"><?php the_title(); ?></a>
        </div>

        <div class="c-mag-home__issue-contents">
          <p><?php the_field('magazine_description'); ?></p>
        </div>
        <div class="c-mag-home__button-wrapper">
          <div class="o-button c-mag-home__button c-mag-home__button--see-more">
            <a href="<?php the_permalink(); ?>">Find Out More</a>
          </div>
          <div class="o-button c-mag-home__button c-mag-home__button--subscribe-now">
            <a href="https://stingingfly.org/product/subscription/">Subscribe Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

</div>
