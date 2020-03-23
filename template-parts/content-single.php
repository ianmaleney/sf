<?php
/**
 * The template part for displaying single posts
 */

 function display_content() {
	echo '<div class="entry-content c-article__body">';
	the_content();
	echo '</div>';
	echo '<section class="entry-footer c-article__footer"><p>';
	guest_author_bio();
	echo '</p></section>';
}

function display_paywall() {
	$sub_url = home_url( '/shop/#subs' );
		echo '<div class="c-subscriber-only-message c-article__body">
		<p>Sorry, this content is only available to subscribers.</p>
		<p>You can subscribe <a href="' . $sub_url . '">here</a>.</p>
		<p>If you are already a subscriber, you can log in here:</p><p>';
		wp_login_form();
		echo '</p></div>';
}

?>

	<article class="o-article" id="post-<?php the_ID(); ?>">

		<section class="entry-header c-article__header 
		<?php foreach((get_the_category()) as $category){
			echo $category->name." ";
		} ?>">
			<div class="c-article__info">
				<h3 class="c-article__category"><?php sf_single_cat(); ?></h3>
				<h1 class="c-article__info--title">
					<?php
						// if ( in_category('magazine') && in_category('archive') ) {
						// 	if ( in_category('unlocked') || paywall() ) {
						// 		// Do Nothing
						// 	} else {
						// 		echo '<span class="lock-icon">&#128274;</span> ';
						// 	}
						// } else {
						// 	// Do Nothing
						// }
					?>
					<?php the_title(); ?>
				</h1>
				<div class="c-article__info--details">
					<div class="c-article__info--author">
						<?php guest_author_link(); ?>
					</div>
				
					<div class="c-article__info--date">
						<?php
							if ( in_category('magazine') ) {
								the_field("issue");
							} else {
								the_date('M d, Y');
							}
						?>
					</div>
				</div>
			</div>
			<?php if ( get_the_post_thumbnail_url() && !in_category( array('Fiction', 'Poetry', 'Drama'))){ ?>
				<div class="c-article__head-image">
					<img src="<?php the_post_thumbnail_url( 'large' ); ?>" />
				</div>
			<?php } ?>
		</section>
		<div class="js-article__social-icons c-article__social-icons">
			<?php get_template_part('template-parts/social-icons'); ?>
		</div>
		<?php
 			// if ( in_category('magazine') && in_category('archive') ) {
			// 	if ( in_category('unlocked') || paywall() ) {
			// 		display_content();
			// 	} else {
			// 		display_paywall();
			// 	}
			// } else {
			// 	display_content();
			// };
			display_content();
			?>
	</article>
