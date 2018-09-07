<?php
/**
 * The template part for displaying review posts
 */
?>

	<article class="o-article" id="post-<?php the_ID(); ?>">

		<section class="entry-header c-article__header c-article__header--review">
			<div class="c-article__head-image c-article__head-image--review">
				<?php $book_cover = get_field("book_cover");
					if ($book_cover){ ?>
						<img src="<?php echo $book_cover['url']; ?>" alt="<?php echo $book_cover['alt']; ?>" />
					<?php } else { ?>
						<img src="<?php the_post_thumbnail_url( 'large' ); ?>" />
					<?php } ?>
				<ul class="c-book-review__info-list">
					<li class="c-book-review__info-list-item"><span class="c-list-item--title">Title:</span> <?php the_title(); ?></li>
					<li class="c-book-review__info-list-item"><span class="c-list-item--title">Author:</span> <?php the_field("book_author"); ?></li>
					<li class="c-book-review__info-list-item"><span class="c-list-item--title">Publisher:</span> <?php the_field("book_publisher"); ?></li>
					<li class="c-book-review__info-list-item"><span class="c-list-item--title">Published:</span>
						<?php
							$date = get_field("date_published");
							$date = new DateTime($date);
							echo $date->format('M Y');
						?>
					</li>
					<li class="c-book-review__info-list-item"><span class="c-list-item--title">Price:</span> <?php the_field("price"); ?></li>
				</ul>
			</div>
			<div class="c-article__info c-article__info--review">
				<h3 class="heading-3 c-article__info--date">
					<?php
						if ( in_category('magazine') ) {
							the_field("issue");
						} else {
							the_date("M d, Y");
						}
					 ?><?php sf_single_cat(); ?>
				</h3>
				<h1 class="heading-1 c-article__info--title c-article__info--title--review">
					<?php the_title(); ?>
				</h1>
				<h2 class="heading-4 c-book-review__author"><i>by</i> <?php the_field("book_author"); ?></h2>
				<h2 class="heading-3 c-article__info--author">
					<span class="c-author-link c-author-link--unlinked">Reviewed by&nbsp;</span><?php guest_author_link(); ?>
				</h2>
				
			</div>
		</section>
		<div class="js-article__social-icons c-article__social-icons">
			<?php get_template_part('template-parts/social-icons'); ?>
		</div>

		<div class="entry-content c-article__body">
			<?php
				the_content();
			?>
		</div>

		<section class="entry-footer c-article__footer">
			<p><?php guest_author_bio(); ?></p>
		</section>

	</article>
