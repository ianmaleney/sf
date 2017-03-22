<?php
/**
 * The template part for displaying event posts.
 */
?>

	<article class="o-article" id="post-<?php the_ID(); ?>">

		<section class="entry-header c-article__header c-article__header--review">
			<div class="c-article__head-image c-article__head-image--review">
				<img src="<?php the_post_thumbnail_url( 'large' ); ?>" />
			</div>
			<div class="c-article__info--review">
				<h3 class="heading-3 c-article__info--date c-article__info--date--event">
					Posted: <?php the_date(); ?><?php sf_single_cat(); ?>
				</h3>
				<h1 class="heading-1 c-article__info--title c-article__info--title--review">
					<?php the_title(); ?>
				</h1>
				<ul class="c-event__info-list">

					<li class="c-event__info-list-item"><span class="c-list-item--title">Location:</span> <?php the_field("venue"); ?></li>
					<li class="c-event__info-list-item"><span class="c-list-item--title">Date:</span>
						<?php
							$date = get_field("event_date");
							$date = new DateTime($date);
							echo $date->format('j M Y');
						?>
					</li>
					<li class="c-event__info-list-item"><span class="c-list-item--title">Time:</span> <?php the_field("start_time"); ?></li>
					<li class="c-event__info-list-item"><span class="c-list-item--title">Price:</span> €<?php the_field("ticket_price"); ?></li>
					<li class="c-event__info-list-item"><span class="c-list-item--title">Tickets:</span> <a href="<?php the_field("ticket_link"); ?>" target="_blank" rel="noopener">Buy Tickets Here</a></li>
				</ul>
			</div>
		</section>
		<div class="js-article__social-icons c-article__social-icons">
			<?php get_template_part('template-parts/social-icons'); ?>
		</div>
		<div class="entry-content c-article__body">
			<?php
				the_content();
			?>
			<?php
				$location = get_field('venue_map');
				if( !empty($location) ):
			?>
			<div class="c-event-map acf-map">
				<div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
			</div>
			<?php endif; ?>
			</div>

	</article>
