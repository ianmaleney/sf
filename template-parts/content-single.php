<?php
/**
 * The template part for displaying single posts
 */
?>

	<article class="o-article" id="post-<?php the_ID(); ?>">

		<section class="entry-header c-article__header">
			<div class="c-article__info">
				<h1 class="heading-1 c-article__info--title">
					<?php the_title(); ?>
				</h1>
				<h2 class="heading-2 c-article__info--author">
					<?php $key="Author"; echo get_post_meta($post->ID, $key, true); ?>
				</h2>
				<h3 class="heading-3 c-article__info--date">
					<?php the_date(); ?> | <?php the_category(', ' ); ?>
				</h3>
			</div>
		</section>


		<div class="entry-content c-article__body">
			<?php
				the_content();
			?>
		</div>

		<section class="entry-footer c-article__footer">
			<p><?php guest_author_bio(); ?></p>
		</section>

	</article>
