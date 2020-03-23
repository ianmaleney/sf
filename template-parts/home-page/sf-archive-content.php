<div class="o-content-row o-content-row--basic">
  <div class="c-row-header">From the Archives</div>

<?php

$args = array(
  'numberposts' => 5,
  'orderby' => 'rand',
  'category' => 'archive',
  'date_query' => array(
        'before' => date('Y-m-d h:i',time() - 60 * 60 * 24 * 365 ))
);

$archivePosts = get_posts( $args );

if($archivePosts) {

	foreach($archivePosts as $post) : setup_postdata( $post ); ?>

  <!-- This is where the "archive content" modules are created -->

  <div class="c-content-module c-content-module--basic c-content-module--archive">
    <div class="c-content-text">
      <p class="c-content-type">
        <?php
          // if ( in_category('unlocked') ) {
          //   // Do Nothing
          // } else {
          //   if ( current_user_can('read') ) {
          //     // Do Nothing
          //   } else {
          //     echo '&#128274; ';
          //   }
          // }
        ?>
        <?php sf_single_cat(); ?>
      </p>
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
      <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
      <p class="c-content-description
        <?php
          if ( in_category('magazine') ) {
            echo 'c-content-description--issue';
          }
        ?>">
        <?php
        if ( in_category('magazine') ) {
          the_field("issue");
        } else {
          the_field('lede');
        }?>
      </p>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>
  <div class="c-content-module c-content-module--basic c-content-module--archive">
    <div class="c-content-text">
      <a class="c-content-module--archive__button" href="/category/archive">Discover more great writing in our Archives</a>
    </div>
  </div>
</div>
