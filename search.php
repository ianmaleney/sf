<?php
/**
 * The template for displaying search results pages
 *
 */

get_header(); ?>

	<main id="main" class="site-main" role="main">
		<div id="primary" class="content-area u-page-wrapper u-page-wrapper--secondary-header u-page-wrapper--category">

			<div class="c-archive-wrapper">
				<!-- Results Box -->
				<div class="c-archive-list">
					<?php 
						if ( have_posts() ) {		
							while ( have_posts() ) : the_post();
							get_template_part( 'template-parts/content', 'archive__module' );
							endwhile;
						}
					?>
				</div>


				<!-- Filter Box -->
				<div class="c-archive-filters">

					<!-- Query -->
					<div class="c-search-query-box">
						<p>Showing <?php $count = $wp_query->post_count; echo $count; ?> Results for: <span id="query"><?php echo get_search_query( __( '', 'textdomain' ) ); ?></span></p>
					</div>

					<!-- Search Box -->
					<div class="c-search-box">
						<form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
							<label>
								<input type="search" class="search-field"
									placeholder="<?php echo esc_attr_x( 'Search …', 'placeholder' ) ?>"
									value="<?php echo get_search_query() ?>" name="s"
									title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>" />
							</label>
							<input type="submit" class="search-submit"
								value="<?php echo esc_attr_x( 'Search', 'submit button' ) ?>" />
						</form>
					</div>

					<!-- Category List -->
					<div class="c-category-list c-filter-list">
						<h3 class="c-category-list__heading">Categories</h3>
						<ul>
							<?php 
								if ( have_posts() ) {
									$i = 0;
									$cats = array();
									while ( have_posts() ) : the_post();
										$post_categories = wp_get_post_categories( get_the_ID() );
										foreach($post_categories as $c){
											$cat = get_category( $c );
											$cats[$i] = $cat->slug;
											$i++;
										}
									endwhile;
									$cat_kv_array = array_count_values($cats);
									foreach ($cat_kv_array as $name => $number) { ?>
										<li class="c-category__list-item c-category-name"><span class="category-name"><?php echo ucfirst($name); ?></span> <span class="category-count">(<?php echo $number; ?>)</span></li>
									<?php }
							}
							?>
						</ul>
					</div>

					<!-- Sort By -->
					<div class="c-results-sort__list c-filter-list">
						<h3 class="c-category-list__heading">Sort By</h3>
						<ul>
							<li class="c-category__list-item c-results-sort">Date Published</li>
							<li class="c-category__list-item c-results-sort">Title</li>
							<li class="c-category__list-item c-results-sort">Relevance</li>
						</ul>
						<button class="c-results-sort__reverse">— Reverse</button>
					</div>


				</div>

			</div>
	</div>

</div><!-- .content-area -->
</main><!-- .site-main -->

<?php get_footer(); ?>
