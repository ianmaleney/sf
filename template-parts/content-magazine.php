<?php
/**
 * The template used for displaying magazine content
 */
?>

<div class="c-product c-product--magazine">

	<section class="c-product-headline">
		<div class="c-product-headline__background">
			<img src="<?php the_field('book_cover'); ?>" />
		</div>
		<div class="c-product-headline__headings">
			<h1 class="heading-1 c-product__title"><?php the_title(); ?></h1>
			<h2 class="heading-2 c-product__author"><i><?php the_field('issue_volume'); ?></i></h2>
		</div>
		<div class="c-product-headline__buttons">
			<a href="<?php the_field('purchase_link'); ?>" class="o-button c-product-button--dark">Buy</a>
			<a href="#info" class="o-button c-product-button--dark">Contents</a>
		</div>
	</section>

	<section id="info" class="c-product-gloss">
		<div class="c-product__magazine-image">
			<img src="<?php the_field('magazine_cover'); ?>" />
		</div>
		<div class="c-magazine-intro">
			<ul class="c-product__purchase-info__list">
				<li><?php the_field('product_info_edition'); ?></li>
				<li>Published: <?php
					$date = get_field('date_published');
					$date2 = date("F Y", strtotime($date));
					echo $date2; ?></li>
				<li>Pages: <?php the_field('pages'); ?></li>
				<li>ISBN: <?php the_field('isbn'); ?></li>
			</ul>
			<p><?php the_field('magazine_description'); ?></p>
		</div>
		<div class="c-product-info c-table-of-contents">
				<h2 class="heading-2"> Inside the Magazine: </h2>
				<p><?php the_field('table_of_contents'); ?></p>
			</div>
		</div>
	</section>

	<section id="buy" class="c-product__purchase-info">
		<div class="c-product__purchase-options">
			<div class="c-purchase-option">
				<a href="<?php the_field('purchase_link'); ?>" target="_blank" rel="noopener" class="o-button">Buy Now</a>
			</div>
		</div>
	</section>

</div>
