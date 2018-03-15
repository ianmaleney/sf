<div class="c-archive-list">
	<?php 
		if ( have_posts() ) {		
			while ( have_posts() ) : the_post();
			get_template_part( 'template-parts/content', 'archive__module' );
			endwhile;
		}
	?>
</div>