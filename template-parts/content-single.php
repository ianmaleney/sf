<?php
/**
 * The template part for displaying single posts
 */
?>

	<article class="o-article" id="post-<?php the_ID(); ?>">

		<section class="entry-header c-article__header 
		<?php foreach((get_the_category()) as $category){
			echo $category->name." ";
		} ?>">
			<?php if ( get_the_post_thumbnail_url() && !in_category( array('Fiction', 'Poetry', 'Drama'))){ ?>
				<div class="c-article__head-image">
					<img src="<?php the_post_thumbnail_url( 'large' ); ?>" />
				</div>
			<?php } ?>
			<div class="c-article__info">
				<h1 class="heading-1 c-article__info--title">
					<?php
						if ( in_category('magazine') ) {
							if ( in_category('unlocked') ) {
								// Do Nothing
							} else {
								if ( current_user_can('read') ) {
									// Do Nothing
								} else {
									echo '&#128274; ';
								}
							}
						} else {
							// Do Nothing
						}
					?>
					<?php the_title(); ?>
				</h1>
				<div class="c-article__info--details">
				<h2 class="heading-2 c-article__info--author">
					<?php guest_author_link(); ?>
				</h2>
				<h3 class="heading-3 c-article__info--date">
					<?php sf_single_cat(); ?><?php
						if ( in_category('magazine') ) {
							the_field("issue");
						} else {
							the_date();
						}
					 ?>
				</h3>
				</div>
			</div>
		</section>
		<div class="js-article__social-icons c-article__social-icons">
			<?php get_template_part('template-parts/social-icons'); ?>
		</div>
		<?php
			if ( in_category('magazine') ) {
				if ( in_category('unlocked') ) {
					echo '<div class="entry-content c-article__body">';
					the_content();
					echo '</div>';
					echo '<section class="entry-footer c-article__footer"><p>';
					guest_author_bio();
					echo '</p></section>';
				} else {
					if ( current_user_can('read') ) {
						echo '<div class="entry-content c-article__body">';
						the_content();
						echo '</div>';
						echo '<section class="entry-footer c-article__footer"><p>';
						guest_author_bio();
						echo '</p></section>';
					} else {
						$sub_url = home_url( '/shop/#subs' );
						echo '<div class="c-subscriber-only-message">
						<p>Sorry, this content is only available to subscribers.</p>
						<p>You can subscribe <a href="' . $sub_url . '">here</a>.</p>
						<p>If you are already a subscriber, you can log in here:</p>';
						wp_login_form( $args );
						echo '</div>';
					}
				}
			} else {
					echo '<div class="entry-content c-article__body">';
					the_content();
					echo '</div>';
					echo '<section class="entry-footer c-article__footer"><p>';
					guest_author_bio();
					echo '</p></section>';
			};
			?>
		<!--<div class="entry-content c-article__body">
			<?php
				the_content();
			?>
		</div>

		<section class="entry-footer c-article__footer">
			<p><?php guest_author_bio(); ?></p>
		</section>-->

	</article>
