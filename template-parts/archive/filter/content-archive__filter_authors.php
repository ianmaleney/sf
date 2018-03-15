<div class="c-category-list c-filter-list c-author-list">
	<h3 class="c-category-list__heading">Authors</h3>
	<ul>
		<?php 
			if ( have_posts() ) {
				$j = 0;
				$authors = array();
				$auth_name = array();
				while ( have_posts() ) : the_post();
					$curauth = get_coauthors(); 
					foreach ($curauth as $auth) {
						$auth_name[$j] = $auth->display_name;
						$j++;
					}
				endwhile;
				asort($auth_name);
				$cat_kv_array = array_count_values($auth_name);
				foreach ($cat_kv_array as $name => $number) { ?>
					<li class="c-category__list-item c-author-name"><span class="author-name"><?php echo ucfirst($name); ?></span> <span class="author-count">(<?php echo $number; ?>)</span></li>
				<?php }
		}
		?>
		<li class="c-category__list-item c-author-name" id="show_all">Show All</li>
	</ul>
</div>