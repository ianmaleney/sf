<?php
/**
 * The template for displaying the secondary header
 *
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
  <link href="https://fonts.googleapis.com/css?family=Amiri:400,400i,700" rel="stylesheet">
  <link rel="stylesheet" href="https://use.typekit.net/zsp1myo.css">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="google-site-verification" content="Lmtt__dhrumGOWi5jBSkWEekZMqCpPjkoWFNzxhjAbA" />
	<?php if( is_author() ) : echo '<title>'; guest_author(); echo ' | '; bloginfo('title'); echo '</title>'; endif; ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <div class="u-secondary-header-wrapper">
      <div class="o-underlay"></div>

      <header class="c-secondary-header">

      <div class="c-secondary-header__title">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
  					 <?php get_template_part( 'svg/inline', 'wordmarkthree' ); ?>
  				</a>
        </div>

        <nav class="c-secondary-header__nav">
          <div class="c-secondary-header__nav--item js-menu-show">
						<div class="c-burger"></div>
            <p>Menu</p>
          </div>
          <div class="c-secondary-header__nav--item search-item">
            <?php get_template_part( 'svg/icons/inline', 'mg' ); ?>
            <p>Search</p>
          </div>
        </nav>

        <div class="c-secondary-header__logo">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
            <?php get_template_part( 'svg/inline', 'logo' ); ?>
          </a>
        </div>

      </header>

      <nav class="c-side-nav">
        <div class="c-side-nav__container js-side-nav-container">
          <?php
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'menu_class'     => 'c-side-nav__menu',
						 ) );
					?>
        </div>
      </nav>

			<?php get_template_part( 'template-parts/module', 'search' ); ?>

    </div>

		<div id="content" class="site-content">
