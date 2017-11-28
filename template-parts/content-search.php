<?php
/**
 * The template part for displaying results in search pages
 */
?>

<?php
	echo '<div class="c-search-result">';
?>

	<div class="c-archive-module__image">
		<img src="<?php the_post_thumbnail_url( 'small' ); ?>">
	</div>
	<div class="c-archive-module__info">
		<a class="c-archive-module__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		<p><a class="c-archive-module__author">
			<?php 
			if ( in_category( 'magazine' ) ) {
				// Do nothing
			} else {
				//the_field('Author');
			}
			?>
		</a><a class="c-archive-module__type"><?php the_category(' '); ?></a></p><a href="#" class="c-archive-module__issue">Issue 19 / Summer 2011</a>
		<p class="c-archive-module__description"><?php the_field('lede'); the_field('magazine_description'); the_field('pullquote')?></p>
	</div>
</div><!-- #post-## -->

<?php $firstLoop = false;
