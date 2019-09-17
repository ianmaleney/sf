<?php
/**
 * The template for displaying pages
 */

get_header('secondary'); ?>

<style>
	body {
		background-color: #f9f9f9;
	}
	.article-header {
		margin: 100px auto;
		padding: 0 3vw;
		max-width: 1000px;
		height: 450px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
	.header-image-wrapper {
		width: 100%;
		height: 450px;
		object-fit: cover;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		background-color: #bbb;
	}
	.article-header img {
		filter: grayscale(1);
		mix-blend-mode: hard-light;
	}
	h1, h2 {
		font-size: calc(3rem + 3vw);
		line-height: 40px;
		color: #ffacbb;
		z-index: 2;
		text-align: center;
		font-family: "Proxima Nova", "Helvetica Neue";
		margin: 40px 0;
	}

	h2 {
		margin: 0;
		font-size: calc(2rem + 2vw);
	}

	article {
		max-width: calc(640px + 4vw);
		margin: 0 auto 200px;
		padding: 0 2vw;
	}

	article p:first-of-type {
		border-top: 1px solid #333;
		border-bottom: 1px solid #333;
		padding: 1.6rem 0;
		margin-bottom: 3.6rem;
	}

	article h2 {
		margin: 4rem auto;
		text-decoration: underline;
	}
</style>
<main>
	<div class="u-page-wrapper--blank">

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();
			?>

			<header class="article-header">
				<div class="header-image-wrapper">
					<?php the_post_thumbnail(); ?>
				</div>
				<h1>The Stinging Fly</h1>
				<h2>&times;</h2>
				<h1>Galway 2020</h1>
			</header>

			<article>
				<?php the_content(); ?>
			<article>
			<?php

			// End of the loop.
		endwhile;
		?>

	</div><!-- .content-area -->
</main> <!--.site-main -->

<?php get_footer(); ?>
