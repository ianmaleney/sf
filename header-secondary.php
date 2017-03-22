<?php
/**
 * The template for displaying the secondary header
 *
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<link href="https://fonts.googleapis.com/css?family=Amiri:400,400i,700" rel="stylesheet">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <div class="u-secondary-header-wrapper">
      <div class="o-underlay"></div>

      <header class="c-secondary-header">

        <nav class="c-secondary-header__nav">
          <div class="c-secondary-header__nav--item js-menu-show">
						<div class="c-burger"></div>
            <p>Browse</p>
          </div>
          <div class="c-secondary-header__nav--item search-item">
            <?php get_template_part( 'svg/icons/inline', 'mg' ); ?>
            <p>Search</p>
          </div>
        </nav>

        <div class="c-secondary-header__title">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
  					<img id="c-secondary-header__wordmark" src="/wp-content/themes/stingingfly/img/harriet-sf-header.png" alt="The Stinging Fly">
  				</a>
        </div>

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
