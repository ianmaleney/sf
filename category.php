<?php
/**
 * The template for displaying search results pages
 *
 */

get_header('secondary'); ?>

	<main id="main" class="site-main" role="main">
		<style> 
		.c-button__loadmore{
			clear: both;
			width: 50%;
			margin: 20px 0;
			background-color: #ddd;
			border-radius: 2px;
			display: block;
			text-align: center;
			font-size: 14px;
			font-size: 0.875rem;
			font-weight: 800;
			letter-spacing:1px;
			cursor:pointer;
			text-transform: uppercase;
			padding: 10px 0;
			transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.3s ease-in-out;  
		}
		.c-button__loadmore:hover{
			background-color: #767676;
			color: #fff;
		}
	</style>
		<div id="primary" class="content-area u-page-wrapper u-page-wrapper--secondary-header">

		
		<?php 
			if ( have_posts() ) {
			$count = $wp_query->post_count;
			// Start the loop.
			while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content', 'archive__module' );

			// End the loop.
			endwhile;
				
			if (  $wp_query->max_num_pages > 1 ) :
				echo '<button class="c-button__loadmore">More posts</button>';
			endif;
		}
			
		
	?>

	</div>

</div><!-- .content-area -->
</main><!-- .site-main -->
<?php get_footer(); ?>
