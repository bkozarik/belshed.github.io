<?php
/**
 * Electro functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Electro
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'electro_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function electro_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Electro, use a find and replace
		 * to change 'electro' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'electro', get_template_directory() . '/languages' );

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
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
        
        register_nav_menu('main', 'Основное меню');
		
		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'electro_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'electro_setup' );

add_action( 'init', 'register_post_types' );
function register_post_types(){
    
    register_post_type( 'service', [
        'label'  => null,
        'labels' => [
            'name'               => 'Услуги', // основное название для типа записи
            'singular_name'      => 'Услуга', // название для одной записи этого типа
            'add_new'            => 'Добавить услугу', // для добавления новой записи
            'add_new_item'       => 'Добавление услуги', // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => 'Редактирование услуги', // для редактирования типа записи
            'new_item'           => 'Новая услуга', // текст новой записи
            'view_item'          => 'Смотреть услугу', // для просмотра записи этого типа.
            'search_items'       => 'Искать услугу', // для поиска по этим типам записи
            'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
            'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
            'parent_item_colon'  => '', // для родителей (у древовидных типов)
            'menu_name'          => 'Услуги', // название меню
        ],
        'description'         => '',
        'public'              => true,
        // 'publicly_queryable'  => null, // зависит от public
        // 'exclude_from_search' => null, // зависит от public
        // 'show_ui'             => null, // зависит от public
        // 'show_in_nav_menus'   => null, // зависит от public
        'show_in_menu'        => true, // показывать ли в меню адмнки
        // 'show_in_admin_bar'   => null, // зависит от show_in_menu
        'show_in_rest'        => true, // добавить в REST API. C WP 4.7
        'menu_position'       => 4,
        'menu_icon'           => 'dashicons-format-aside',
        //'capability_type'   => 'post',
        //'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => [ 'title', 'editor' ], // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
        'taxonomies'          => [],
        'has_archive'         => false,
        'rewrite'             => true,
        'query_var'           => true,
    ] );
    
    register_post_type( 'articles', [
        'label'  => null,
        'labels' => [
            'name'               => 'Статьи', // основное название для типа записи
            'singular_name'      => 'Статья', // название для одной записи этого типа
            'add_new'            => 'Добавить статью', // для добавления новой записи
            'add_new_item'       => 'Добавление статьи', // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => 'Редактирование статьи', // для редактирования типа записи
            'new_item'           => 'Новая статья', // текст новой записи
            'view_item'          => 'Смотреть статью', // для просмотра записи этого типа.
            'search_items'       => 'Искать статью', // для поиска по этим типам записи
            'not_found'          => 'Статьи не найдено', // если в результате поиска ничего не было найдено
            'not_found_in_trash' => 'Статьи не найдено в корзине', // если не было найдено в корзине
            'parent_item_colon'  => '', // для родителей (у древовидных типов)
            'menu_name'          => 'Статьи', // название меню
        ],
        'description'         => '',
        'public'              => true,
        // 'publicly_queryable'  => null, // зависит от public
        // 'exclude_from_search' => null, // зависит от public
        // 'show_ui'             => null, // зависит от public
        // 'show_in_nav_menus'   => null, // зависит от public
        'show_in_menu'        => true, // показывать ли в меню адмнки
        // 'show_in_admin_bar'   => null, // зависит от show_in_menu
        'show_in_rest'        => true, // добавить в REST API. C WP 4.7
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-media-document',
        //'capability_type'   => 'post',
        //'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => [ 'title', 'editor' ], // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
        'taxonomies'          => [],
        'has_archive'         => false,
        'rewrite'             => true,
        'query_var'           => true,
    ] );
    
    register_post_type( 'portfolio', [
        'label'  => 'portfolios',
        'labels' => [
            'name'               => 'Наши работы', // основное название для типа записи
            'singular_name'      => 'Работа', // название для одной записи этого типа
            'add_new'            => 'Добавить работу', // для добавления новой записи
            'add_new_item'       => 'Добавление работы', // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => 'Редактирование работы', // для редактирования типа записи
            'new_item'           => 'Новая работа', // текст новой записи
            'view_item'          => 'Смотреть работу', // для просмотра записи этого типа.
            'search_items'       => 'Искать работу', // для поиска по этим типам записи
            'not_found'          => 'Работы не найдено', // если в результате поиска ничего не было найдено
            'not_found_in_trash' => 'Работ в корзине не найдено', // если не было найдено в корзине
            'parent_item_colon'  => '', // для родителей (у древовидных типов)
            'menu_name'          => 'Наши работы', // название меню
        ],
        'description'         => '',
        'public'              => true,
        // 'publicly_queryable'  => null, // зависит от public
        // 'exclude_from_search' => null, // зависит от public
        // 'show_ui'             => null, // зависит от public
        // 'show_in_nav_menus'   => null, // зависит от public
        'show_in_menu'        => true, // показывать ли в меню адмнки
        // 'show_in_admin_bar'   => null, // зависит от show_in_menu
        'show_in_rest'        => true, // добавить в REST API. C WP 4.7
        'menu_position'       => 6,
        'menu_icon'           => 'dashicons-format-gallery',
        //'capability_type'   => 'post',
        //'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => [ 'title', 'editor' ], // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
        'taxonomies'          => [],
        'has_archive'         => false,
        'rewrite'             => true,
        'query_var'           => true,
    ] );
}

add_action( 'init', 'add_portfolio_to_json_api', 30 );
function add_portfolio_to_json_api(){
    global $wp_post_types;
    $wp_post_types['portfolio']->show_in_rest = true;
    $wp_post_types['portfolio']->rest_base = 'portfolios';
    $wp_post_types['portfolio']->rest_controller_class = 'WP_REST_Posts_Controller';
}

add_action( 'wp_ajax_ajax_form_handler', 'ajax_form_handler' );
add_action( 'wp_ajax_nopriv_ajax_form_handler', 'ajax_form_handler' );

function ajax_form_handler(){
    $form_fields = array('user_name', 'user_tel', 'user_mail');
    
    $response = array(
        'status' => 'success',
    );
    
    foreach ($form_fields as $key => $field){
        if(isset($_POST[$field]) && $_POST[$field] != 'none'){
            $response[$field] = htmlspecialchars($_POST[$field]);
        }
    }
    $headers = 'From: My Name <myname@mydomain.com>' . "\r\n";
    wp_mail('hkiop1@yandex.ru', 'Test mail', '222', $headers);
    echo json_encode($response);
    wp_die();
}

add_filter( 'excerpt_length', function(){
    return 25;
} );

add_filter('excerpt_more', function($more) {
    return '...';
});
/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function electro_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'electro_content_width', 640 );
}
add_action( 'after_setup_theme', 'electro_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function electro_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'electro' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'electro' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'electro_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function electro_scripts() {
	wp_enqueue_style( 'electro-style-aos', get_template_directory_uri() . '/assets/css/aos.css', array(), _S_VERSION );
	wp_enqueue_style( 'electro-style-swiper', get_template_directory_uri() . '/assets/css/swiper-bundle.min.css', array(), _S_VERSION );
	wp_enqueue_style( 'electro-style-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array(), _S_VERSION );
	wp_enqueue_style( 'electro-style-keyframes', get_template_directory_uri() . '/assets/css/keyframes.css', array(), _S_VERSION );
	wp_enqueue_style( 'electro-style-style', get_template_directory_uri() . '/assets/css/style.css', array(), _S_VERSION );
	wp_enqueue_style( 'electro-style-media', get_template_directory_uri() . '/assets/css/media.css', array(), _S_VERSION );

	wp_enqueue_script( 'electro-swiper', get_template_directory_uri() . '/assets/js/swiper-bundle.min.js', array(), _S_VERSION, true );
	wp_enqueue_script( 'electro-aos', get_template_directory_uri() . '/assets/js/aos.js', array(), _S_VERSION, true );
	wp_enqueue_script( 'electro-script', get_template_directory_uri() . '/assets/js/main.js', array('wp-api'), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
    
    wp_localize_script('electro-script', 'ajax', array(
        'url' => admin_url('admin-ajax.php'),
    ));
	
}
add_action( 'wp_enqueue_scripts', 'electro_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

require get_template_directory() . '/inc/redux-options.php';

