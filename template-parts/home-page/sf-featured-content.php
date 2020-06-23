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
      <?php 
      $image = get_field('featured_image');
      if( !empty($image) ) { ?>
        <img class="c-content-image" data-src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>">
      <?php } else {
        ?> <img class="c-content-image" data-src="<?php the_post_thumbnail_url(); ?>">
      <?php } ?>
    </a>
    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
     <div class="c-content-text--meta">
        <?php if( get_field('issue_volume') || get_field('isbn')) { ?>
          <!-- Do Nothing -->
        <?php } else { ?>
          <?php if ('page' != get_post_type() && 'product' != get_post_type()) { ?>
            <p class="c-content-type"><?php sf_single_cat() ?></p>
            <p class="sep">|</p>
            <p class="c-content-author"><?php guest_author_link(); ?></p>
          <?php } ?>
      <?php } ?>
    </div>
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
      <img class="c-content-image" data-src="<?php the_post_thumbnail_url( 'large' ); ?>">
    </a>
    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
      <div class="c-content-text--meta">
        <?php if( get_field('issue_volume') || get_field('isbn')) { ?>
          <!-- Do Nothing -->
        <?php } else { ?>
         <?php if ('page' != get_post_type()) { ?>
            <p class="c-content-type"><?php sf_single_cat() ?></p>
            <p class="sep">|</p>
          <?php } ?>
          <p class="c-content-author"><?php guest_author_link(); ?></p>
          <?php } ?>
      </div>
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
        <?php dynamic_sidebar( 'home_featured_image' ); ?>
    </div>
  <?php endif; ?>
</div>

</div>
