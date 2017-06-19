<?php

get_header(); ?>

	<main id="main" class="site-main" role="main">
		<div id="primary" class="content-area u-page-wrapper u-page-wrapper--primary-header">
		<div class="c-archive-page-info o-article--info">
			<h2 class="heading-2">The Stinging Fly Archives</h2>
			<p>Welcome to the archives of <i>The Stinging Fly</i> magazine. Our back-catalogue contains over fifty issues full of fiction, poetry, essays and more, and we are in the process of making that material available online. Some pieces will be available for all to read, but the entire archive will only be available to subscribers. If you're not already a subscriber, you can become one <a href="https://stingingfly.org/product/subscription/">here</a>.</p>
			<p>The first half of our archive, covering everything back to Winter 2006-07, is now available below. The remaining material will become available to subscribers over the coming months, with the entire archive due to be online by the time we celebrate our 20th birthday in November.</p>
			</div>

			<div class="o-content-row o-content-row--basic c-content-row--archive-page" id="fiction">
			  <a class="c-row-header" href="https://stingingfly.org/category/fiction/">Fiction</a>
				<?php
				$args = array(
				  'numberposts' => 3,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+fiction',
				  'category__not_in' => '1406'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
				      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
				      <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
				      <p class="c-content-description"><?php the_field('lede'); ?></p>
				    </div>
				  </div>

				  <?php endforeach;
				  wp_reset_postdata();
				};

				$args = array(
				  'numberposts' => 3,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+fiction'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
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

			<div class="o-content-row o-content-row--basic c-content-row--archive-page" id="poetry">
			  <a class="c-row-header" href="https://stingingfly.org/category/poetry/">Poetry</a>
				<?php
				$args = array(
				  'numberposts' => 3,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+poetry',
				  'category__not_in' => '1406'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
				      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
				      <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
				      <p class="c-content-description"><?php the_field('lede'); ?></p>
				    </div>
				  </div>

				  <?php endforeach;
				  wp_reset_postdata();
				};

				$args = array(
				  'numberposts' => 3,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+poetry'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
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



			<div class="c-archive-page-search"> 
				<?php get_template_part('searchform'); ?>
			</div>
			<div class="o-content-row o-content-row--basic c-content-row--archive-page" id="essays">
			  <a class="c-row-header" href="https://stingingfly.org/category/essay/">Essays</a>
				<?php
				$args = array(
				  'numberposts' => 3,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'essay',
				  'category__not_in' => '1406'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <!-- This is where the "latest content" modules are created -->

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
				      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
				      <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
				      <p class="c-content-description"><?php the_field('lede'); ?></p>
				    </div>
				  </div>

				  <?php endforeach;
				  wp_reset_postdata();
				};

				$args = array(
				  'numberposts' => 3,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'essay'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <!-- This is where the "latest content" modules are created -->

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
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

			<div class="o-content-row o-content-row--basic c-content-row--archive-page" id="interviews">
			  <a class="c-row-header" href="https://stingingfly.org/category/interview/">Interviews</a>
				<?php
				$args = array(
				  'numberposts' => 1,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+interview',
				  'category__not_in' => '1406'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <!-- This is where the "latest content" modules are created -->

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
				      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
				      <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
				      <p class="c-content-description"><?php the_field('lede'); ?></p>
				    </div>
				  </div>

				  <?php endforeach;
				  wp_reset_postdata();
				};

				$args = array(
				  'numberposts' => 2,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+interview+locked'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <!-- This is where the "latest content" modules are created -->

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
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

			<div class="o-content-row o-content-row--basic c-content-row--archive-page" id="refresh">
			  <a class="c-row-header" href="https://stingingfly.org/category/refresh/">Re:fresh</a>
				<?php
				$args = array(
				  'numberposts' => 2,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+re:fresh',
				  'category__not_in' => '1406'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <!-- This is where the "latest content" modules are created -->

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
				      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
				      <p class="c-content-author"><i>by</i> <?php guest_author_link(); ?></p>
				      <p class="c-content-description"><?php the_field('lede'); ?></p>
				    </div>
				  </div>

				  <?php endforeach;
				  wp_reset_postdata();
				};

				$args = array(
				  'numberposts' => 2,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+re:fresh'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>

				  <!-- This is where the "latest content" modules are created -->

				  <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
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

			<div class="o-content-row o-content-row--basic c-content-row--archive-page" id="reviews">
			  <a class="c-row-header" href="https://stingingfly.org/category/review/">Reviews</a>
				<?php
				$args = array(
				  'numberposts' => 8,
				  'orderby' => 'rand',
					'order' => 'DESC',
				  'category_name' => 'archive+review'
				);

				$latestPosts = get_posts( $args );

				if($latestPosts) {

					foreach($latestPosts as $post) : setup_postdata( $post ); ?>
				 <div class="c-content-module c-content-module--basic c-content-module--archive-page">
				    <a href="<?php the_permalink(); ?>" class="c-content-image-link">
				      <img class="c-content-image" src="<?php the_post_thumbnail_url( 'medium_large' ); ?>">
				    </a>
				    <div class="c-content-text">
				      <p class="c-content-type"><?php sf_single_cat(); ?></p>
				      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
				      <p class="c-content-book-author"><?php the_field('book_author'); ?></p>
				      <p class="c-content-author">Reviewed by <?php guest_author_link(); ?></p>
				    </div>
				  </div>

				  <?php endforeach;
				  wp_reset_postdata();
				};

				?>

			</div>

			<div class="c-archive-page-search"> 
				<?php get_template_part('searchform'); ?>
			</div>

		</div>
	</div><!-- .content-area -->
</main><!-- .site-main -->
<?php get_footer(); ?>
