<div class="c-archive-module">
	<?php if (has_post_thumbnail()) { ?>
	<div class="c-archive-module__image">
		<a href="<?php the_permalink(); ?>"><img src="<?php archive_image_output(); ?>"></a>
	</div> <?php } ?>
	<div class="c-archive-module__info">
		<?php guest_author_link(); ?>
		<a class="c-archive-module__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		<p class="c-archive-module__description"><?php the_field('lede'); ?></p>
		<p class="c-archive-module__details">
			<?php if (is_category('archive')){ ?>
				<span class="c-archive-module__type"><?php single_cat_title( __( '', 'textdomain' ) ); ?></span>
			<?php } ?>
		<span class="c-archive-module__issue"><?php if ( in_category('magazine') ) {
			the_field("issue");
		} else {
			the_date();
		} ?></span></p>
		
	</div>
</div>