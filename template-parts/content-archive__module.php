<?php $categories = get_the_category(); ?>
<div class="c-archive-module <?php 
		if ( ! empty( $categories ) ) {
			foreach ($categories as $cat) {
				echo esc_html( $cat->name ).' ';
			}
		} ?>">
	
	<div class="c-archive-module__info">

		<!-- Post Title -->
		<a class="c-archive-module__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>

		<!-- Description -->
		<p class="c-archive-module__description"><?php the_field('lede'); ?></p>

		<!-- Post Meta -->
		<p class="c-archive-module__details">

			<!-- Author Name -->
			<?php 
			$type = $post->post_type;
			if (guest_author_link() && $type !== 'page' && $type !== 'product') { ?>
			<span class="c-author-link">
				<?php guest_author_link(); ?>
			</span>
			<?php } ?>

			<!-- Post Category -->
			<?php 
				// var_dump($post);
				
				if ($type !== 'page' && $type !== 'product') { ?>
					<span class="c-archive-module__type">
						<?php sf_single_cat(); ?>
					</span>
				<?php } ?>
				
			
			
			<!-- Post Date/Magazine Issue -->
			<?php if ($type !== 'page' && $type !== 'product') { ?>
			<span class="c-archive-module__issue"><?php if ( in_category('magazine') ) {
				the_field("issue");
			} else {
				the_date();
			} ?></span>
			<?php } ?>
		</p>
		
	</div>
</div>