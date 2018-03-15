<div class="author-box">
	<?php 
		$curauth = $wp_query->get_queried_object(); 
		echo '<h2 class="page-title author-name">'.$curauth->display_name.'</h2>';
		echo '<p class="author-description">'.$curauth->description.'</p>';
	?>
</div>