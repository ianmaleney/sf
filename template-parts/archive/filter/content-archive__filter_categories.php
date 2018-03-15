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
				<?php } ?>
				<li class="c-category__list-item c-category-name" id="show_all">Show All</li>
		<?php }
		?>
		
	</ul>
</div>