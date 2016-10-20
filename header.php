<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php if( is_author() ) : echo '<title>'; guest_author(); echo ' | '; bloginfo('title'); echo '</title>'; endif; ?>
	<link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700" rel="stylesheet">
	<?php wp_head(); ?>
	<title>Test!</title>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<div class="site-inner">
		<header id="masthead" class="c-primary-header c-home-header" role="banner">

      <!--<div class="c-primary-header__sub-image"><?php get_template_part( 'svg/inline', 'logo' ); ?></div> -->

      <div class="c-primary-header__title">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<?php get_template_part( 'svg/inline', 'wordmark' ); ?>
				</a>
			</div>

      <div class="c-primary-header__social-icons">
        <div class="c-social-icons">
					<a href="https://www.facebook.com/StingingFly" target="_blank" rel="noopener">
						<?php get_template_part( 'svg/icons/inline', 'fb' ); ?>
					</a>
					<a href="http://twitter.com/stingingfly" target="_blank" rel="noopener">
						<?php get_template_part( 'svg/icons/inline', 'tw' ); ?>
					</a>
					<a href="http://www.stingingfly.org/feed" target="_blank" rel="noopener">
						<?php get_template_part( 'svg/icons/inline', 'rss' ); ?>
					</a>
				</div>
      </div>

      <nav class="c-primary-header__nav">

        <div class="o-underlay"></div>

        <nav class="c-primary-header__nav--container js-side-nav-container" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'twentysixteen' ); ?>">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'menu_class'     => 'c-primary-header__nav--menu',
						 ) );
					?>
        </nav>

      </nav>

      <nav class="c-bottom-nav">
        <ul class="c-bottom-nav__menu">
          <li class="c-bottom-nav__menu--item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php get_template_part( 'svg/icons/inline', 'home' ); ?></a></li>
          <li class="c-bottom-nav__menu--item"><a href="<?php echo esc_url( home_url( '/magazine' ) ); ?>"><?php get_template_part( 'svg/icons/inline', 'book' ); ?></a></li>
          <li class="c-bottom-nav__menu--item search-item"><?php get_template_part( 'svg/icons/inline', 'mg' ); ?></li>
          <li class="c-bottom-nav__menu--item js-menu-show"><div class="c-burger"></li>
        </ul>
      </nav>

      <?php get_template_part( 'template-parts/module', 'search' ); ?>

    </header>
		<div id="content" class="site-content">
