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
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;600;700&display=swap" rel="stylesheet">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="google-site-verification" content="Lmtt__dhrumGOWi5jBSkWEekZMqCpPjkoWFNzxhjAbA" />
	<?php if( is_author() ) : echo '<title>'; guest_author(); echo ' | '; bloginfo('title'); echo '</title>'; endif; ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<div class="site-inner">
		<header id="masthead" class="c-primary-header c-home-header" role="banner">

		<div class="c-primary-header__title">
    	<a href="/" rel="home">
    		<?php get_template_part( 'svg/inline', 'wordmarkbodoni' ); ?>
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
				<div class="c-log-in">
					<?php if( is_user_logged_in() ) { ?>
						<a href="<?php echo wp_logout_url( home_url() ); ?>">Log Out</a> |
						<a href="<?php $url = home_url( '/shop' ); echo $url; ?>">Shop</a>
					<?php } else { ?>
						<a href="<?php $url = home_url( '/wp-login.php' ); echo $url; ?>">Log In</a> |
						<a href="<?php $url = home_url( '/subscribe' ); echo $url; ?>">Subscribe</a>
					<?php } ?>
					
				</div>
      </div>

      <div class="c-primary-header__nav">

        <div class="o-underlay"></div>

        <nav class="c-primary-header__nav--container js-side-nav-container" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'twentysixteen' ); ?>">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'menu_class'     => 'c-primary-header__nav--menu',
						 ) );
					?>
        </nav>

      </div>

      <nav class="c-bottom-nav">
        <ul class="c-bottom-nav__menu">
          <li class="c-bottom-nav__menu--item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php get_template_part( 'svg/icons/inline', 'home' ); ?></a>
					<span class="c-bottom-nav__menu--tag">Home</span></li>
          <li class="c-bottom-nav__menu--item"><a href="<?php echo esc_url( home_url( '/magazine' ) ); ?>"><?php get_template_part( 'svg/icons/inline', 'book' ); ?></a>
					<span class="c-bottom-nav__menu--tag">Magazine</span></li>
          <li class="c-bottom-nav__menu--item search-item"><?php get_template_part( 'svg/icons/inline', 'mg' ); ?><span class="c-bottom-nav__menu--tag">Search</span></li>
          <li class="c-bottom-nav__menu--item js-menu-show"><div class="c-burger"></div>
					<span class="c-bottom-nav__menu--tag">More</span></li>
        </ul>
      </nav>

      <?php get_template_part( 'template-parts/module', 'search' ); ?>

    </header>
		<div id="content" class="site-content">
