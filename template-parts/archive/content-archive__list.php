<div class="c-archive-list">
	<?php 
		if ( have_posts() ) {		
			while ( have_posts() ) : the_post();
			get_template_part( 'template-parts/content', 'archive__module' );
			endwhile; ?>
			<div class="pagination__wrapper">
				<div class="page-nav nav-previous alignleft"><?php next_posts_link( 'Older posts' ); ?></div>
				<div class="page-nav nav-next alignright"><?php previous_posts_link( 'Newer posts' ); ?></div>
			</div>
		<?php } else {
			?><div class="search-error-message"><h2>Sorry, we could not find any posts that matched your query.</h2></div><?php
		}
	?>
</div>