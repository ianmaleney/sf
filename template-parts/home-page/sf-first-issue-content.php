<div class="o-content-row o-content-row--issue-one">
  <div class="c-content-module c-content-module--notice">
    <div class="c-content-module--notice__img-wrapper">
      <a href="https://stingingfly.org/product/spring-1998/">
        <img class="c-content-module--notice__img" src="http://stingingfly.org/wp-content/uploads/2018/03/issue-one.jpg" alt="Cover of Stinging Fly Issue One">
      </a>
    </div>
    <div class="c-content-module--notice__text-wrapper">
      <h1 class="heading-1 c-content-module--notice__title"><em>The Stinging Fly</em> is 20!</h1>
      <p>Twenty years ago this week, the first issue of <em>The Stinging Fly</em> was brought into the world. To celebrate, we've made all the stories and poems from <a href="https://stingingfly.org/product/spring-1998/">our first issue</a> available to read here on our website.</p>
      <p>We're also giving you 20% off everything <a href="/shop">in our shop</a>, for the month of March. Just use the code 'SF20' when you're checking out.</p>
      <p>Finally, <a href="https://stingingfly.org/submissions/">we are accepting submissions</a> through the month of March from writers who have not been published in print before. If you are a new, unpublished writer you can send us one or two of your poems or a short story before the end of the month.</p>
    </div>
  </div>
<?php

$args = array(
  'post_type'      => 'any',
  'posts_per_page' => -1,
  'category_name'  => 'magazine',
  'tag'            => '3011'
);

$issueOne = new WP_Query( $args );

if ( $issueOne->have_posts() ) {
  while ( $issueOne->have_posts() ) { $issueOne->the_post(); ?>

    <div class="c-content-module c-content-module--issue-one">
      <div class="c-content-text">
        <p class="c-content-type"><?php sf_single_cat() ?><?php the_field('issue_volume'); ?></p>
        <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
        <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
      </div>
    </div>

  <?php } wp_reset_postdata(); } ?>

</div>
