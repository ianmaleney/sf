<div class="c-archive-module">
	<div class="c-archive-module__image">
		<a href="<?php the_permalink(); ?>"><img src="<?php archive_image_output(); ?>"></a>
	</div>
	<div class="c-archive-module__info">
		<a class="c-archive-module__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		<p><?php guest_author_link(); ?><a href="<?php cat_name_URL(); ?>" class="c-archive-module__type"><?php sf_single_cat(); ?></a></p>
		<p class="c-archive-module__issue"><?php if ( in_category('magazine') ) {
			the_field("issue");
		} else {
			the_date();
		} ?></p>
		<p class="c-archive-module__description"><?php the_field('lede'); ?></p>
	</div>
</div><!-- #post-## -->