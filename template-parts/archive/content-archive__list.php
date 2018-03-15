<div class="c-archive-list">
	<?php 
		if ( have_posts() ) {		
			while ( have_posts() ) : the_post();
			get_template_part( 'template-parts/content', 'archive__module' );
			endwhile;
		} else {
			?><div class="search-error-message"><h2>Sorry, we could not find any posts that matched your query.</h2></div><?php
		}
	?>
</div>