	<?php if( get_field('issue_volume') ): ?>
		<div class="c-table-of-contents">
			<?php 
				$slug = get_the_ID();

				// Base Arguments for List
				$base_args = array(
					'posts_per_page' => -1,
					'orderby' => 'author',
					'order' => 'ASC',
					'tag' => $slug
				);

				// Filter the list by Category
				// Fiction: 92 / Poetry: 252 / Essay: 27 / Criticism: 118 / Interview: 540
				$fiction_arg = array(
					'category__and' => array(
			      '212',
			      '92'
			    )
				);

				$poetry_arg = array(
					'category__and' => array(
			      '212',
			      '252'
			    ),
			    'tag__not_in' => array('256')
				);

				$featured_poet_arg = array(
					'category__and' => array(
			      '212',
			      '252'
			    ),
			    'tag_slug__and' => array($slug, 'featured-poet')
				);

				$essay_arg = array(
					'category__and' => array(
			      '212',
			      '27'
			    )
				);

				$refresh_arg = array(
					'category_name' => 'archive+re:fresh'
				);

				$crit_arg = array(
					'post_type' => 'review',
					'category__and' => array(
			      '212',
			      '118'
			    )
				);

				$interview_arg = array(
					'category__and' => array(
			      '212',
			      '540'
			    )
				);

				?>

			<!-- TOC Fiction Section -->
			<div class="c-table-of-contents__section">
				<?php 
					$args = array_merge($base_args, $fiction_arg);
					$fiction_query = new WP_Query( $args );
					if ( $fiction_query->have_posts() ) { ?>
						<h2 class="c-table-of-contents__section-header">Fiction</h2>
						<ul class="c-table-of-contents__list c-table-of-contents__list--fiction">
					<?php
						// The Loop
						while ( $fiction_query->have_posts() ) {
							$fiction_query->the_post(); ?>
							<li class="c-table-of-contents__link">
								<?php guest_author_link(); ?> - 
									<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
										&lsquo;<?php the_title(); ?>&rsquo;
									</a>
							</li>
						<?php }
						wp_reset_postdata();
					}
				?>
				</ul>
			</div>
			<!-- TOC Poetry Section -->
			<div class="c-table-of-contents__section">
				<?php 
					$args = array_merge($base_args, $poetry_arg);
					$poetry_query = new WP_Query( $args );
					if ( $poetry_query->have_posts() ) { ?>
						<h2 class="c-table-of-contents__section-header">Poetry</h2>
						<ul class="c-table-of-contents__list c-table-of-contents__list--poetry">
					<?php
						// The Loop
						while ( $poetry_query->have_posts() ) {
							$poetry_query->the_post(); ?>
							<li class="c-table-of-contents__link">
								<?php guest_author_link(); ?> - 
									<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
										&lsquo;<?php the_title(); ?>&rsquo;
									</a>
							</li>
						<?php }
						wp_reset_postdata();
					}
				?>
				</ul>
				<?php 
					$args = array_merge($base_args, $featured_poet_arg);
					$featured_poet_query = new WP_Query( $args );
					if ( $featured_poet_query->have_posts() ) { ?>
						<h2 class="c-table-of-contents__section-header">Featured Poet</h2>
						<ul class="c-table-of-contents__list c-table-of-contents__list--poetry">
					<?php
						// The Loop
						while ( $featured_poet_query->have_posts() ) {
							$featured_poet_query->the_post(); ?>
							<li class="c-table-of-contents__link">
								<?php guest_author_link(); ?> -
									<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
										&lsquo;<?php the_title(); ?>&rsquo;
									</a>
							</li>
						<?php }
						wp_reset_postdata();
					}
				?>
				</ul>
			</div>

			<!-- TOC Essay Section -->
			<div class="c-table-of-contents__section">
				<?php 
					$args = array_merge($base_args, $essay_arg);
					$essay_query = new WP_Query( $args );
					if ( $essay_query->have_posts() ) { ?>
						<h2 class="c-table-of-contents__section-header">Essays</h2>
						<ul class="c-table-of-contents__list c-table-of-contents__list--essay">
					<?php // The Loop
						while ( $essay_query->have_posts() ) {
							$essay_query->the_post(); ?>
							<li class="c-table-of-contents__link">
								<?php guest_author_link(); ?> - 
									<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
										&lsquo;<?php the_title(); ?>&rsquo;
									</a>
							</li>
						<?php }
						wp_reset_postdata();
					}
				?>
				</ul>
				<?php 
					$args = array_merge($base_args, $refresh_arg);
					$refresh_query = new WP_Query( $args );
					if ( $refresh_query->have_posts() ) { ?>
						<h2 class="c-table-of-contents__section-header">Re:fresh</h2>
						<ul class="c-table-of-contents__list c-table-of-contents__list--essay">
					<?php // The Loop
						while ( $refresh_query->have_posts() ) {
							$refresh_query->the_post(); ?>
							<li class="c-table-of-contents__link">
								<?php guest_author_link(); ?> - 
									<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
										&lsquo;<?php the_title(); ?>&rsquo;
									</a>
							</li>
						<?php }
						wp_reset_postdata();
					}
				?>
				</ul>
			</div>

			<!-- TOC Interview Section -->
			<div class="c-table-of-contents__section">
				<?php 
					$args = array_merge($base_args, $interview_arg);
					$interview_query = new WP_Query( $args );
					if ( $interview_query->have_posts() ) { ?>
						<h2 class="c-table-of-contents__section-header">Interviews</h2>
						<ul class="c-table-of-contents__list c-table-of-contents__list--interviews">
					<?php // The Loop
						while ( $interview_query->have_posts() ) {
							$interview_query->the_post(); ?>
							<li class="c-table-of-contents__link">
								 <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
										<?php the_title(); ?>
									</a> <span style="font-weight: 400;">by</span> <?php guest_author_link(); ?>
							</li>
						<?php }
						wp_reset_postdata();
					}
				?>
				</ul>
			</div>

			<!-- TOC Criticism Section -->
			<div class="c-table-of-contents__section">
				<?php 
					$args = array_merge($base_args, $crit_arg);
					$crit_query = new WP_Query( $args );
					if ( $crit_query->have_posts() ) { ?>
						<h2 class="c-table-of-contents__section-header">Criticism</h2>
						<ul class="c-table-of-contents__list c-table-of-contents__list--criticism">
					<?php // The Loop
						while ( $crit_query->have_posts() ) {
							$crit_query->the_post(); ?>
							<li class="c-table-of-contents__link">
								<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
									<?php the_field("book_author"); ?>: <i><?php the_title(); ?></i></a>, <span style="font-weight: 400;">reviewed by</span> <?php guest_author_link(); ?>
							</li>
						<?php }
						wp_reset_postdata();
					}
				?>
				</ul>
			</div>	
		</div>
	<?php endif; ?>