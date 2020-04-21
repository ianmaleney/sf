<?php
/**
 * The template used for displaying product content
 */
?>

<div class="c-product">
	<section class="c-product-gloss">
		<div class="c-product__image">
			<img src="<?php the_field('book_cover'); ?>" />
		</div>
		<div class="c-product__pullquote">
			<p class="c-product__pullquote--quote"><?php the_field('pullquote'); ?></p>
			<p class="c-product__pullquote--attrib">— <?php the_field('pullquote_author'); ?></p>
		</div>
	</section>

	<section id="info" class="c-product-info">
		<div class="c-product__excerpt">
			<p><?php the_field('excerpt'); ?></p>
		</div>
	</section>

	<section class="c-product__author-bio">
		<div class="c-product__author-bio__image"><img src="<?php the_field('author_photo'); ?>"></div>
		<div class="c-product__author-bio__text">
			<h3 class="heading-4">– About 
				<?php 
					$a = get_field('author'); 
					function seoUrl($string) {
				    //Lower case everything
				    $string = strtolower($string);
				    //Make alphanumeric (removes all other characters)
				    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
				    //Clean up multiple dashes or whitespaces
				    $string = preg_replace("/[\s-]+/", " ", $string);
				    //Convert whitespaces and underscore to dash
				    $string = preg_replace("/[\s_]/", "-", $string);
				    return $string;
				}
				$slug = seoUrl($a);
				?><a href="<?php $url = home_url('author/' . $slug); echo $url; ?>"><?php the_field('author'); ?></a>
			–</h3>
			<p><?php the_field('author_bio'); ?></p>
		</div>
	</section>

	<section id="reviews" class="c-product__blurb-group">
		<h3 class="heading-3">Praise for <i><?php the_title(); ?></i>:</h3>
		<div class="c-product__blurb">
			<p class="c-product__blurb-quote"><?php the_field('blurb_quote'); ?></p>
			<p class="c-product__blurb-attrib">— <?php the_field('blurb_attribution'); ?></p>
		</div>
	</section>

</div>
