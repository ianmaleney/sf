<?php
/**
 * Twenty Sixteen functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

/**
 * Twenty Sixteen only works in WordPress 4.4 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.4-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
}

if ( ! function_exists( 'twentysixteen_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 *
 * Create your own twentysixteen_setup() function to override in a child theme.
 *
 * @since Twenty Sixteen 1.0
 */
function twentysixteen_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed at WordPress.org. See: https://translate.wordpress.org/projects/wp-themes/twentysixteen
	 * If you're building a theme based on Twenty Sixteen, use a find and replace
	 * to change 'twentysixteen' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'twentysixteen' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for custom logo.
	 *
	 *  @since Twenty Sixteen 1.2
	 */
	add_theme_support( 'custom-logo', array(
		'height'      => 240,
		'width'       => 240,
		'flex-height' => true,
	) );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 1200, 9999 );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'twentysixteen' ),
		'social'  => __( 'Social Links Menu', 'twentysixteen' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
		'gallery',
		'status',
		'audio',
		'chat',
	) );


	// Indicate widget sidebars can use selective refresh in the Customizer.
	add_theme_support( 'customize-selective-refresh-widgets' );
}
endif; // twentysixteen_setup
add_action( 'after_setup_theme', 'twentysixteen_setup' );

/**
 * Sets the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 *
 * @since Twenty Sixteen 1.0
 */
function twentysixteen_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'twentysixteen_content_width', 840 );
}
add_action( 'after_setup_theme', 'twentysixteen_content_width', 0 );

/**
 * Registers a widget area.
 *
 * @link https://developer.wordpress.org/reference/functions/register_sidebar/
 *
 * @since Twenty Sixteen 1.0
 */
function twentysixteen_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'twentysixteen' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Add widgets here to appear in your sidebar.', 'twentysixteen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Content Bottom 1', 'twentysixteen' ),
		'id'            => 'sidebar-2',
		'description'   => __( 'Appears at the bottom of the content on posts and pages.', 'twentysixteen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Content Bottom 2', 'twentysixteen' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Appears at the bottom of the content on posts and pages.', 'twentysixteen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'twentysixteen_widgets_init' );

/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 *
 * @since Twenty Sixteen 1.0
 */
function twentysixteen_javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'twentysixteen_javascript_detection', 0 );

/**
 * Enqueues scripts and styles.
 *
 * @since Twenty Sixteen 1.0
 */
function twentysixteen_scripts() {

	// Theme stylesheet.
	wp_enqueue_style( 'twentysixteen-style', get_stylesheet_uri() );

	// Load the Internet Explorer specific stylesheet.
	wp_enqueue_style( 'twentysixteen-ie', get_template_directory_uri() . '/css/ie.css', array( 'twentysixteen-style' ), '20160816' );
	wp_style_add_data( 'twentysixteen-ie', 'conditional', 'lt IE 10' );

	// Load the Internet Explorer 8 specific stylesheet.
	wp_enqueue_style( 'twentysixteen-ie8', get_template_directory_uri() . '/css/ie8.css', array( 'twentysixteen-style' ), '20160816' );
	wp_style_add_data( 'twentysixteen-ie8', 'conditional', 'lt IE 9' );

	// Load the Internet Explorer 7 specific stylesheet.
	wp_enqueue_style( 'twentysixteen-ie7', get_template_directory_uri() . '/css/ie7.css', array( 'twentysixteen-style' ), '20160816' );
	wp_style_add_data( 'twentysixteen-ie7', 'conditional', 'lt IE 8' );

	// Load the html5 shiv.
	wp_enqueue_script( 'twentysixteen-html5', get_template_directory_uri() . '/js/html5.js', array(), '3.7.3' );
	wp_script_add_data( 'twentysixteen-html5', 'conditional', 'lt IE 9' );

	wp_enqueue_script( 'twentysixteen-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20160816', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'twentysixteen-keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20160816' );
	}

	wp_enqueue_script( 'twentysixteen-script', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20160816', true );

	wp_localize_script( 'twentysixteen-script', 'screenReaderText', array(
		'expand'   => __( 'expand child menu', 'twentysixteen' ),
		'collapse' => __( 'collapse child menu', 'twentysixteen' ),
	) );
}
add_action( 'wp_enqueue_scripts', 'twentysixteen_scripts' );

/**
 * Adds custom classes to the array of body classes.
 *
 * @since Twenty Sixteen 1.0
 *
 * @param array $classes Classes for the body element.
 * @return array (Maybe) filtered body classes.
 */
function twentysixteen_body_classes( $classes ) {
	// Adds a class of custom-background-image to sites with a custom background image.
	if ( get_background_image() ) {
		$classes[] = 'custom-background-image';
	}

	// Adds a class of group-blog to sites with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Adds a class of no-sidebar to sites without active sidebar.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	return $classes;
}
add_filter( 'body_class', 'twentysixteen_body_classes' );

/**
 * Converts a HEX value to RGB.
 *
 * @since Twenty Sixteen 1.0
 *
 * @param string $color The original color, in 3- or 6-digit hexadecimal form.
 * @return array Array containing RGB (red, green, and blue) values for the given
 *               HEX code, empty array otherwise.
 */
function twentysixteen_hex2rgb( $color ) {
	$color = trim( $color, '#' );

	if ( strlen( $color ) === 3 ) {
		$r = hexdec( substr( $color, 0, 1 ).substr( $color, 0, 1 ) );
		$g = hexdec( substr( $color, 1, 1 ).substr( $color, 1, 1 ) );
		$b = hexdec( substr( $color, 2, 1 ).substr( $color, 2, 1 ) );
	} else if ( strlen( $color ) === 6 ) {
		$r = hexdec( substr( $color, 0, 2 ) );
		$g = hexdec( substr( $color, 2, 2 ) );
		$b = hexdec( substr( $color, 4, 2 ) );
	} else {
		return array();
	}

	return array( 'red' => $r, 'green' => $g, 'blue' => $b );
}

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for content images
 *
 * @since Twenty Sixteen 1.0
 *
 * @param string $sizes A source size value for use in a 'sizes' attribute.
 * @param array  $size  Image size. Accepts an array of width and height
 *                      values in pixels (in that order).
 * @return string A source size value for use in a content image 'sizes' attribute.
 */
function twentysixteen_content_image_sizes_attr( $sizes, $size ) {
	$width = $size[0];

	840 <= $width && $sizes = '(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 1362px) 62vw, 840px';

	if ( 'page' === get_post_type() ) {
		840 > $width && $sizes = '(max-width: ' . $width . 'px) 85vw, ' . $width . 'px';
	} else {
		840 > $width && 600 <= $width && $sizes = '(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px';
		600 > $width && $sizes = '(max-width: ' . $width . 'px) 85vw, ' . $width . 'px';
	}

	return $sizes;
}
add_filter( 'wp_calculate_image_sizes', 'twentysixteen_content_image_sizes_attr', 10 , 2 );

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for post thumbnails
 *
 * @since Twenty Sixteen 1.0
 *
 * @param array $attr Attributes for the image markup.
 * @param int   $attachment Image attachment ID.
 * @param array $size Registered image size or flat array of height and width dimensions.
 * @return string A source size value for use in a post thumbnail 'sizes' attribute.
 */
function twentysixteen_post_thumbnail_sizes_attr( $attr, $attachment, $size ) {
	if ( 'post-thumbnail' === $size ) {
		is_active_sidebar( 'sidebar-1' ) && $attr['sizes'] = '(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 60vw, (max-width: 1362px) 62vw, 840px';
		! is_active_sidebar( 'sidebar-1' ) && $attr['sizes'] = '(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 1362px) 88vw, 1200px';
	}
	return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'twentysixteen_post_thumbnail_sizes_attr', 10 , 3 );

/**
 * Modifies tag cloud widget arguments to have all tags in the widget same font size.
 *
 * @since Twenty Sixteen 1.1
 *
 * @param array $args Arguments for tag cloud widget.
 * @return array A new modified arguments.
 */
function twentysixteen_widget_tag_cloud_args( $args ) {
	$args['largest'] = 1;
	$args['smallest'] = 1;
	$args['unit'] = 'em';
	return $args;
}
add_filter( 'widget_tag_cloud_args', 'twentysixteen_widget_tag_cloud_args' );


//
//
// Registering Footer Menu
//
//
function register_my_menus() {
	register_nav_menus(
    array(
      'footer-menu' => __( 'Footer Menu' ),
      'side-menu' => __( 'Side Menu' )
    )
  );
}
add_action( 'init', 'register_my_menus' );

// Registering Sidebars
add_action( 'widgets_init', 'my_register_sidebars' );

function my_register_sidebars() {

	/* Register the 'primary' sidebar. */
	register_sidebar(
		array(
			'id' => 'primary',
			'name' => __( 'Primary-Right' ),
			'description' => __( 'Primary Sidebar on right of page.' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h3 class="widget-title">',
			'after_title' => '</h3>'
		)
	);

	/* Register the 'sidebar-bottom' sidebar. */
	register_sidebar(
		array(
			'id' => 'sidebar-bottom',
			'name' => __( 'Sidebar-Bottom' ),
			'description' => __( 'Secondary Sidebar at the bottom of the page.' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h3 class="widget-title">',
			'after_title' => '</h3>'
		)
	);
}

// Enqueueing Custom JS
function my_assets() {
	wp_enqueue_script( 'theme-scripts', '/wp-content/themes/stingingfly/js/scripts.js', array( 'jquery' ), '1.0', true );
	wp_enqueue_script( 'google-map', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDyOSJHHEtVA9dipjBHm8FL7ehWF0BxeM0', array(), '3', true );
  wp_enqueue_script( 'acf_map_script', '/wp-content/themes/stingingfly/js/acf-maps.js', array( 'jquery' ), '1.0', true );
}


add_action( 'wp_enqueue_scripts', 'my_assets' );

// Defer Custom JS
function add_defer_attribute($tag, $handle) {
   // add script handles to the array below
   $scripts_to_defer = array('theme-scripts', 'twentysixteen-html5', 'twentysixteen-skip-link-focus-fix', 'twentysixteen-script', );

   foreach($scripts_to_defer as $defer_script) {
      if ($defer_script === $handle) {
         return str_replace(' src', ' defer="defer" src', $tag);
      }
   }
   return $tag;
}

add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);


//* Adding DNS Prefetching
function ism_dns_prefetch() {
    echo '<meta http-equiv="x-dns-prefetch-control" content="on">
		<link rel="dns-prefetch" href="//fonts.gstatic.com/" />
		<link rel="dns-prefetch" href="//pixel.wp.com/" />
		<link rel="dns-prefetch" href="//stats.wp.com" />';
}
add_action('wp_head', 'ism_dns_prefetch', 0);

function cat_name() {
	$categories = get_the_category();
	if ( ! empty( $categories ) ) {
		echo esc_html( $categories[0]->name );
	}
}

function cat_name_URL(){
	$categories = get_the_category();
	echo esc_url( get_category_link( $categories[0]->term_id) );
}

function issue_date() {
	$issue = get_field( "issue_volume" );
		if( $issue ) {
			echo $issue;
		} else {
			the_date();
		}
}

function archive_image_output() {
	$magCover = get_field( 'magazine_cover' );
	$bookCover = get_field('book_cover');
	$thumb = the_post_thumbnail_url( 'small' );


}





//
// Popular Posts Functionality - https://digwp.com/2016/03/diy-popular-posts/
//

function shapeSpace_popular_posts($post_id) {
	$count_key = 'popular_posts';
	$count = get_post_meta($post_id, $count_key, true);
	if ($count == '') {
		$count = 0;
		delete_post_meta($post_id, $count_key);
		add_post_meta($post_id, $count_key, '0');
	} else {
		$count++;
		update_post_meta($post_id, $count_key, $count);
	}
}
function shapeSpace_track_posts($post_id) {
	if (!is_single()) return;
	if (empty($post_id)) {
		global $post;
		$post_id = $post->ID;
	}
	shapeSpace_popular_posts($post_id);
}
add_action('wp_head', 'shapeSpace_track_posts');

//
// WooCommerce Setup
//
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

add_action('woocommerce_before_main_content', 'my_theme_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'my_theme_wrapper_end', 10);

function my_theme_wrapper_start() {
  echo '<div class="u-page-wrapper u-page-wrapper--primary-header"><main id="main" class="site-main" role="main">';
}

function my_theme_wrapper_end() {
  echo '</main></div>';
}

add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
    add_theme_support( 'woocommerce' );
}

add_filter( 'woocommerce_product_tabs', 'wcs_woo_remove_reviews_tab', 98 );
    function wcs_woo_remove_reviews_tab($tabs) {
    unset($tabs['reviews']);
    return $tabs;
}

/**
 * Optimize WooCommerce Scripts
 * Remove WooCommerce Generator tag, styles, and scripts from non WooCommerce pages.
 */
add_action( 'wp_enqueue_scripts', 'child_manage_woocommerce_styles', 99 );

function child_manage_woocommerce_styles() {
 //remove generator meta tag
 remove_action( 'wp_head', array( $GLOBALS['woocommerce'], 'generator' ) );

 //first check that woo exists to prevent fatal errors
 if ( function_exists( 'is_woocommerce' ) ) {
	 //dequeue scripts and styles
	 if ( ! is_woocommerce() && ! is_cart() && ! is_checkout() ) {
		 wp_dequeue_style( 'woocommerce_frontend_styles' );
		 wp_dequeue_style( 'woocommerce-layout' );
		 wp_dequeue_style( 'woocommerce_fancybox_styles' );
		 wp_dequeue_style( 'woocommerce_chosen_styles' );
		 wp_dequeue_style( 'woocommerce_prettyPhoto_css' );
		 wp_dequeue_style( 'woocommerce-general' );	// Remove the gloss
	 	 wp_dequeue_style( 'woocommerce-layout' );		// Remove the layout
	 	 wp_dequeue_style( 'woocommerce-smallscreen' );	// Remove the smallscreen optimisation
		 wp_dequeue_script( 'wc_price_slider' );
		 wp_dequeue_script( 'wc-single-product' );
		 wp_dequeue_script( 'wc-add-to-cart' );
		 wp_dequeue_script( 'wc-cart-fragments' );
		 wp_dequeue_script( 'wc-checkout' );
		 wp_dequeue_script( 'wc-add-to-cart-variation' );
		 wp_dequeue_script( 'wc-single-product' );
		 wp_dequeue_script( 'wc-cart' );
		 wp_dequeue_script( 'wc-chosen' );
		 wp_dequeue_script( 'woocommerce' );
		 wp_dequeue_script( 'prettyPhoto' );
		 wp_dequeue_script( 'prettyPhoto-init' );
		 wp_dequeue_script( 'jquery-blockui' );
		 wp_dequeue_script( 'jquery-placeholder' );
		 wp_dequeue_script( 'fancybox' );
		 wp_dequeue_script( 'jqueryui' );
		 }
	 }

}

//
// Guest Authors
//

function guest_author_link() {
	global $post;
	$terms = wp_get_post_terms( $post->ID, 'product_cat' );
	
	if ( $terms ) {
		foreach ( $terms as $term ) $categories[] = $term->slug;
		if ( ! in_array( 'product', $categories ) || in_array( 'book', $categories )) {
			if ( function_exists( 'coauthors_posts_links' ) ) {
				coauthors_posts_links();
			} else {
					the_author_posts_link();
				}
			}
	} elseif ( function_exists( 'coauthors_posts_links' ) ) {
				coauthors_posts_links();
		} else {
				the_author_posts_link();
			}
}

	

function guest_author() {
	if ( function_exists( 'coauthors' ) ) {
		coauthors();
	} else {
			the_author();
		}
}

function guest_author_bio() {
	$author = get_the_author();
	if ( function_exists( 'coauthors_bio' ) && $author != "The Stinging Fly") {
		coauthors_bio();
	} else {
			// the_author();
		}
}

//
// Single Category Display Function
//
function sf_single_cat($excludedcats = array(212, 1190, 4, 5, 1406, 1, 1268, 1374)){

    $categories = get_the_category();
    $output = '';
    foreach($categories as $category) {
        if ( !in_array($category->cat_ID, $excludedcats) ) {
            $output .= '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '">' . esc_html( $category->name ) . '</a> ';
        }
    }
    echo trim($output);
}

//
//
// Cleaning Up the Header
//
//

function cubiq_setup () {
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);

    add_filter('the_generator', '__return_false');
    //add_filter('show_admin_bar','__return_false');

    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
}

add_action('after_setup_theme', 'cubiq_setup');

// Removing WP Embed
function my_deregister_scripts(){
	if(!is_admin()) {
	  wp_deregister_script( 'wp-embed' );
	}
}
add_action( 'wp_enqueue_scripts', 'my_deregister_scripts' );

// Removing JQuery Migrate
function optimize_jquery() {
if (!is_admin()) {
wp_deregister_script('jquery');
wp_deregister_script('jquery-migrate.min');
wp_deregister_script('comment-reply.min');
wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', false, '3.6', true);

wp_enqueue_script('jquery');
}
}
add_action('template_redirect', 'optimize_jquery');

// Registing Google Maps API Key for ACF Maps
function my_acf_google_map_api( $api ){

	$api['key'] = 'AIzaSyDyOSJHHEtVA9dipjBHm8FL7ehWF0BxeM0';

	return $api;

}

add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

// Woocommerce Edits for Magazine Content
add_filter( 'woocommerce_product_tabs', 'woo_custom_description_tab', 98 );
function woo_custom_description_tab( $tabs ) {
	if (has_term( 'magazine', 'product_cat') ){
		if (has_term( 'archive', 'product_tag') ){
			$tabs['description']['callback'] = 'woo_custom_toc';	// Custom description callback
			$tabs['description']['title'] = 'Table Of Contents';
		}
	}
	return $tabs;
}

function woo_custom_toc() {
	get_template_part( 'template-parts/woocommerce/archival-content' );
}


/**
*
*
* Enhanced Search
*
*
*/

if ( !is_admin() ) {
	add_filter( 'pre_get_posts', 'tgm_io_cpt_search' );
}

/**
 * This function modifies the main WordPress query to include an array of
 * post types instead of the default 'post' post type.
 *
 * @param object $query  The original query.
 * @return object $query The amended query.
 */
function tgm_io_cpt_search( $query ) {

    if( is_search() || is_author() ) {
			// Get post types
			$post_types = get_post_types(array('public' => true, 'exclude_from_search' => false), 'objects');
			$searchable_types = array();
			// Add available post types
			if( $post_types ) {
				foreach( $post_types as $type) {
					$searchable_types[] = $type->name;
				}
			}
			$query->set( 'post_type', $searchable_types );
			$query->set('orderby', 'relevance');
		}
    return $query;

}

// Weight Relevancy Towards Posts over Products
add_filter( 'posts_search_orderby', function( $search_orderby ) {
    global $wpdb;
    return "{$wpdb->posts}.post_type LIKE 'post' OR {$wpdb->posts}.post_type LIKE 'review' DESC, {$search_orderby}";
});

// Weight Relevancy towards Book Pages
add_filter( 'posts_search_orderby', function( $search_orderby ) {
    global $wpdb;
    return "{$wpdb->posts}.post_parent LIKE 149 DESC, {$search_orderby}";
});


/*
 // ACF Search
 // [list_searcheable_acf list all the custom fields we want to include in our search query]
 // @return [array] [list of custom fields]
*/

// Define list of ACF fields you want to search through - do NOT include taxonomies here
function list_searcheable_acf(){
  $list_searcheable_acf = array(
    // Post Fields
  	"lede", 
  	// Podcast Fields
  	"podcast_series", 
  	"podcast_episode title",
  	// Product Fields
  	"isbn",
  	"author",
  	"excerpt", 
  	"blurb_attribution", 
  	"pullquote_author",
  	"issue_volume",
  	"magazine_description",
  	// Reviews Fields
  	"book_author",
  	"book_publisher",
  	// Event Fields
  	"venue");
  return $list_searcheable_acf;
}

/*
 * [advanced_custom_search search that encompasses ACF/advanced custom fields and taxonomies and split expression before request]
 * @param  [query-part/string]      $search    [the initial "where" part of the search query]
 * @param  [object]                 $wp_query []
 * @return [query-part/string]      $search    [the "where" part of the search query as we customized]
 * modified from gist: https://gist.github.com/FutureMedia/9581381/73afa809f38527d57f4213581eeae6a8e5a1340a
 * see https://vzurczak.wordpress.com/2013/06/15/extend-the-default-wordpress-search/
 * credits to Vincent Zurczak for the base query structure/spliting tags section and Sjouw for comment cleanup
*/

function advanced_custom_search( $search, $wp_query ) {
  global $wpdb;

  if ( empty( $search )) {
    return $search;
  }

  // 1- get search expression
  $terms_raw = $wp_query->query_vars[ 's' ];

  // 2- check search term for XSS attacks
  $terms_xss_cleared = strip_tags($terms_raw);

  // 3- do another check for SQL injection, use WP esc_sql
  $terms = esc_sql($terms_xss_cleared);

  // 4- explode search expression to get search terms
  $exploded = explode( ' ', $terms );
  if( $exploded === FALSE || count( $exploded ) == 0 ) {
    $exploded = array( 0 => $terms );
  }

  // 5- setup search variable as a string
  $search = '';

  // 6- get searcheable_acf, a list of advanced custom fields you want to search content in
  $list_searcheable_acf = list_searcheable_acf();

  // 7- get custom table prefixes, thanks to Brian Douglas @bmdinteractive on github for this improvement
  $table_prefix = $wpdb->prefix;
    
  // 8- search through tags, inject each into SQL query
  foreach( $exploded as $tag ) {
    $search .= "
      AND (
        (".$table_prefix."posts.post_title LIKE '%$tag%')
        OR (".$table_prefix."posts.post_content LIKE '%$tag%')

        OR EXISTS (
          SELECT * FROM ".$table_prefix."postmeta
          WHERE post_id = ".$table_prefix."posts.ID
          AND (";
            // 9b - reads through $list_searcheable_acf array to see which custom post types you want to include in the search string
            foreach ($list_searcheable_acf as $searcheable_acf) {
              if ($searcheable_acf == $list_searcheable_acf[0]) {
                $search .= " (meta_key LIKE '%" . $searcheable_acf . "%' AND meta_value LIKE '%$tag%') ";
              } else {
                $search .= " OR (meta_key LIKE '%" . $searcheable_acf . "%' AND meta_value LIKE '%$tag%') ";
              }
            }
          $search .= ")
        )
        
        OR EXISTS (
          SELECT * FROM ".$table_prefix."comments
          WHERE comment_post_ID = ".$table_prefix."posts.ID
          AND comment_content LIKE '%$tag%'
        )

        OR EXISTS (
          SELECT * FROM ".$table_prefix."terms
          INNER JOIN ".$table_prefix."term_taxonomy
          ON ".$table_prefix."term_taxonomy.term_id = ".$table_prefix."terms.term_id
          INNER JOIN ".$table_prefix."term_relationships
          ON ".$table_prefix."term_relationships.term_taxonomy_id = ".$table_prefix."term_taxonomy.term_taxonomy_id

          WHERE (
            taxonomy = 'magazine'
            OR taxonomy = 'archive'
            OR taxonomy = 'event'
            OR taxonomy = 'review'
            OR taxonomy = 'product'
            OR taxonomy = 'author'
          )
          AND object_id = ".$table_prefix."posts.ID
          AND ".$table_prefix."terms.name LIKE '%$tag%'
        )
      )"; // closes $search
    } // closes foreach
  return $search;
} 

add_filter( 'posts_search', 'advanced_custom_search', 500, 2 );

/*************************************
//
//
// Widgetising the Home Page /////////
//
//
*************************************/

/**
 * Register widgetized areas.
 *
 */
function hp_widgets_init() {

	register_sidebar( array(
		'name'          => 'Home Featured Image',
		'id'            => 'home_featured_image',
		'before_widget' => '<div>',
		'after_widget'  => '</div>'
	) );

	register_sidebar( array(
		'name'          => 'Home Page',
		'id'            => 'home_page',
		'before_widget' => '<div class="c-hp-widget">',
    'after_widget'  => '</div>'
	) );

	register_sidebar( array(
		'name'          => 'Title Image',
		'id'            => 'title_image'
	) );

	

}
add_action( 'widgets_init', 'hp_widgets_init' );


/*************************************
//
//
// Log In Page Styles ////////////////
//
//
*************************************/

function site_login_styles() { ?>
    <style type="text/css">
        #login h1 a, .login h1 a {
            background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/sf-logo-drawn-80x80.png);
            padding-bottom: 30px;
        }

        body.login {
				  background-color: #4dadf7;
  				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); 
  			}

  			#login #loginform {
  				box-shadow: 0 10px 20px rgba(0,0,0,0.3)
  			}

  			#login #nav, #login #backtoblog {
  				padding: 14px 24px;
  				background-color: white;
  				margin-top: 0;
  				box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  				border-top: 1px solid rgba(200,200,200,0.5);
  			}
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'site_login_styles' );


/*
/
/ Guest Authors Endpoints for WP-API
/
*/

if ( function_exists('get_coauthors') ) {
    add_action( 'rest_api_init', 'custom_register_coauthors' );
    
    function custom_register_coauthors() {
        register_rest_field( 'post',
            'coauthors',
            array(
                'get_callback'    => 'custom_get_coauthors',
                'update_callback' => null,
                'schema'          => null,
            )
        );
    }
 
    function custom_get_coauthors( $object, $field_name, $request ) {
        $coauthors = get_coauthors($object['id']);
 
        $authors = array();
        foreach ($coauthors as $author) {
            $authors[] = array(
                'display_name' => $author->display_name,
                'user_nicename' => $author->user_nicename
            );
        };
 
        return $authors;
    }
}

/*
*
* Function To Stop Archive Posts Being Emailed to Blog Followers
*
*/

add_filter( 'jetpack_subscriptions_exclude_these_categories', 'exclude_these' );
function exclude_these( $categories ) {
    $categories = array( 'archive');
    return $categories;
}

/*************************************************
*
* Temporary Function To Remove Category From Posts
*
*************************************************/

/* add_action( 'init', function()
{
    // Get all the posts which is assigned to the Poetry category
    $args = [
        'posts_per_page' => 100, // Adjust as needed
        'cat'            => 92, // Category ID for Fiction category
        'fields'         => 'ids', // Only get post ID's for performance
        //'offset'         => 0
    ];
    $q = get_posts( $args );

    // Make sure we have posts
    if ( !$q )
        return;

    // We have posts, lets loop through them and remove the category
    foreach ( $q as $id )
        wp_remove_object_terms(
            $id, // Post ID
            1424, // Term ID to remove
            'category' // The taxonomy the term belongs to
        );
}, PHP_INT_MAX ); */

/*************************
*
* Custom Category Pages 
*
*************************/


add_filter( 'pre_get_posts', 'sf_category_archives' );
function sf_category_archives( $query ) {
if ( $query->is_category() && $query->is_main_query()  )  {
	$query->set( 'posts_per_page', '12');
}

return $query;

}

add_filter( 'pre_get_posts', 'sf_search_query' );
function sf_search_query( $query ) {
if ( $query->is_search() )  {
	$query->set( 'posts_per_page', '13');
}

return $query;

}

function category_load_more_scripts() {
	
		global $wp_query; 
	
		// register our main script but do not enqueue it yet
		wp_register_script( 'category_loadmore', get_stylesheet_directory_uri() . '/js/category_loadmore.js', array('jquery') );
	
		wp_localize_script( 'category_loadmore', 'misha_loadmore_params', array(
			'ajaxurl' => site_url() . '/wp-admin/admin-ajax.php', // WordPress AJAX
			'posts' => json_encode( $wp_query->query_vars ), // everything about your loop is here
			'current_page' => get_query_var( 'paged' ) ? get_query_var('paged') : 1,
			'max_page' => $wp_query->max_num_pages
		) );
	
		wp_enqueue_script( 'category_loadmore' );
	}
	
add_action( 'wp_enqueue_scripts', 'category_load_more_scripts' );

function misha_loadmore_ajax_handler(){
 
	// prepare our arguments for the query
	$args = json_decode( stripslashes( $_POST['query'] ), true );
	$args['paged'] = $_POST['page'] + 1; // we need next page to be loaded
	$args['post_status'] = 'publish';
 
	// it is always better to use WP_Query but not here
	query_posts( $args );
 
	if( have_posts() ) :
 
		// run the loop
		while( have_posts() ): the_post();
 
			get_template_part( 'template-parts/content', 'archive__module' );
 
		endwhile;
 
	endif;
	die; // here we exit the script and even no wp_reset_query() required!
}
 
 
 
add_action('wp_ajax_loadmore', 'misha_loadmore_ajax_handler'); // wp_ajax_{action}
add_action('wp_ajax_nopriv_loadmore', 'misha_loadmore_ajax_handler'); // wp_ajax_nopriv_{action}

?>
