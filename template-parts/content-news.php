<?php
/**
 * The template part for displaying news posts.
 */
?>

	<article class="o-article" id="post-<?php the_ID(); ?>">

		<section class="entry-header c-article__header c-article__header--review">
			<div class="c-article__head-image c-article__head-image--review">
				<img src="<?php the_post_thumbnail_url( 'large' ); ?>" />
			</div>
			<div class="c-article__info--review">
				<h1 class="heading-1 c-article__info--title c-article__info--title--review">
					<?php the_title(); ?>
				</h1>
				<h3 class="heading-3 c-article__info--date">
					<?php the_date(); ?><?php sf_single_cat(); ?>
				</h3>
			</div>
		</section>
		<div class="js-article__social-icons c-article__social-icons">
			<?php get_template_part('template-parts/social-icons'); ?>
		</div>
		<div class="entry-content c-article__body">
			<?php
				the_content();
			?>
		</div>

	</article>
