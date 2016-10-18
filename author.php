<?php
/**
 * The template for displaying archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each one. For example, tag.php (Tag archives),
 * category.php (Category archives), author.php (Author archives), etc.
 *
 */

get_header(); ?>

<main id="main" class="site-main" role="main">
	<div id="primary" class="content-area u-page-wrapper u-page-wrapper--primary-header">

		<?php
			function cat_name() {
				$categories = get_the_category();
				if ( ! empty( $categories ) ) {
					echo esc_html( $categories[0]->name );
				}
			}

			function cat_name_URL(){
				$categories = get_the_category();
				echo esc_url( get_category_link( $categories[0]->term_id) );
			}

			function issue_date() {
				$issue = get_field( "issue_volume" );
					if( $issue ) {
						echo $issue;
					} else {
						the_date();
					}
			}

			function archive_image_output() {
				$magCover = get_field( "magazine_cover" );
				$bookCover = get_field('book_cover');
				$thumb = the_post_thumbnail_url( 'small' );
					if( $magCover ) {
						echo $magCover;
					}
					elseif( $bookCover ) {
						echo $bookCover;
					}
					else {
						echo $thumb;
					}
			}
		?>


	<?php if ( have_posts() ) :
		$firstLoop = true;
		$count = $wp_query->post_count;
		// Start the loop.
		while ( have_posts() ) : the_post();

			if ($count < 2) :
				echo '<div class="c-archive-list">';
			endif;

			if ($firstLoop && $count > 1) :
				echo '<div class="c-archive-module c-archive-module--featured">';
			else :
				echo '<div class="c-archive-module">';
			endif;


			?>

				<div class="c-archive-module__image">
					<a href="<?php the_permalink(); ?>"><img src="<?php archive_image_output(); ?>"></a>
				</div>
				<div class="c-archive-module__info">
					<a class="c-archive-module__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					<p><?php guest_author_link(); ?><a href="<?php cat_name_URL(); ?>" class="c-archive-module__type"><?php cat_name(); ?></a></p>
					<p class="c-archive-module__issue"><?php issue_date(); ?></p>
					<p class="c-archive-module__description"><?php the_field('lede'); ?></p>
				</div>
			</div><!-- #post-## -->
			<?php
				if ($firstLoop && $count > 1) :
					echo '<div class="c-archive-list">';
				endif;

				$firstLoop = false;

			// get_template_part( 'template-parts/content', 'search' );

		// End the loop.
		endwhile;

		// Previous/next page navigation.
		the_posts_pagination( array(
			'prev_text'          => __( 'Previous page', 'twentysixteen' ),
			'next_text'          => __( 'Next page', 'twentysixteen' ),
			'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>',
		) );

	// If no content, include the "No posts found" template.
	else : ?>
		<p> Sorry, we cannot find what you're looking for. </p>

	<?php endif;?>

</div>
<nav class="o-search-nav o-search-nav--archive">
	<h1 class="heading-1 c-search-nav__heading"><?php guest_author(); ?></h1>
	<p class="c-search-nav__description"><?php guest_author_bio(); ?></p>
	<div class="o-search-input-group">
		<div class="c-search-input">
			<label for=".c-search-input__year">Select by Date:</label>
			<input type="month" class="c-search-input__year">
		</div>
		<div class="c-search-input">
			<label for=".c-search-input__author">Search by Author:</label>
			<input type="field" class="c-search-input__author">
		</div>
		<div class="c-search-input">
			<label for=".c-search-input__issue">Search by Issue:</label>
			<input type="number" class="c-search-input__issue">
		</div>
		<div class="c-search-input">
			<label for=".c-search-input__category">Search by Category:</label>
			<input type="field" class="c-search-input__category">
		</div>
		<button class="o-button">Browse All Issues</button>
	</div>
</nav>

</div><!-- .content-area -->
</main><!-- .site-main -->
<?php get_footer(); ?>
