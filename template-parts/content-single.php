<?php
/**
 * The template part for displaying single posts
 */
?>

	<article class="o-article" id="post-<?php the_ID(); ?>">

		<section class="entry-header c-article__header">
			<div class="c-article__head-image">
				<img src="<?php the_post_thumbnail_url( 'large' ); ?>" />
			</div>
			<div class="c-article__info">
				<h1 class="heading-1 c-article__info--title">
					<?php the_title(); ?>
				</h1>
				<h2 class="heading-2 c-article__info--author">
					<?php guest_author_link(); ?>
				</h2>
				<h3 class="heading-3 c-article__info--date">
					<?php the_date(); ?> | <?php the_category(', ' ); ?>
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

		<section class="entry-footer c-article__footer">
			<p><?php guest_author_bio(); ?></p>
		</section>

	</article>
