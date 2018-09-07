<?php
/**
 * The template used for displaying page content
 *
 */
?>

<article class="o-article o-article--info">
	<div class="c-article__body">
		<?php
		the_content();

		?>

	<?php
		edit_post_link(
			sprintf(
				/* translators: %s: Name of current post */
				__( 'Edit<span class="screen-reader-text"> "%s"</span>', 'twentysixteen' ),
				get_the_title()
			),
			'<footer class="entry-footer"><span class="edit-link">',
			'</span></footer><!-- .entry-footer -->'
		);
	?>
</div>
</article><!-- #post-## -->
