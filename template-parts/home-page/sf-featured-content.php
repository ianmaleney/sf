<div class="o-content-row o-content-row--featured">
  <div class="c-row-header">Featured</div>

<?php

$args = array(
  'post_type' => 'any',
  'posts_per_page' => 1,
	'meta_key' => 'featured_content',
	'meta_value' => true
);

$featuredPost = new WP_Query( $args );

if ( $featuredPost->have_posts() ) {
  while ( $featuredPost->have_posts() ) {
    $featuredPost->the_post(); ?>

  <div class="c-content-module c-content-module--featured">
    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'large' ); ?>">
    </a>
    <div class="c-content-text">
      <p class="c-content-type"><?php sf_single_cat() ?><?php the_field('issue_volume'); ?></p>
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
      <?php if( get_field('issue_volume') ) { ?>
        <!-- Do Nothing -->
      <?php } else { ?>
        <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>    
      <?php } ?>
      <p class="c-content-description"><?php the_field('lede'); ?></p>
    </div>
  </div>

  <?php } wp_reset_postdata();
    } ?>


<div class="c-featured-second-row__wrapper">
<div class="c-secondary-featured__wrapper">
<?php

$args = array(
  'post_type' => 'any',
  'numberposts' => 5,
	'meta_key' => 'featured_content',
	'meta_value' => true,
  'offset' => 1
);

$secondaryPosts = get_posts( $args );

if($secondaryPosts) {

	foreach($secondaryPosts as $post) : setup_postdata( $post ); ?>

  <div class="c-content-module c-content-module--secondary-featured">
    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'large' ); ?>">
    </a>
    <div class="c-content-text">
      <p class="c-content-type"><?php sf_single_cat() ?></p>
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
      <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
      <p class="c-content-description"><?php the_field('lede'); ?></p>
    </div>
  </div>


  <?php endforeach;
  wp_reset_postdata();
};

?>
</div>

  <?php if ( is_active_sidebar( 'home_featured_image' ) ) : ?>
    <div class="c-featured-content__big-sub-ad" role="complementary">
      <a href="/subscribe">
        <?php dynamic_sidebar( 'home_featured_image' ); ?>
      </a>
    </div>
  <?php endif; ?>
</div>

</div>
