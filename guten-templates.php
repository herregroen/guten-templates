<?php
/**
 * Plugin Name: guten-templates
 * Plugin URI: https://yoast.com
 * Description: Create Gutenberg blocks using only HTML!
 * Author: herregroen
 * Author URI: https://yoast.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function load_guten_templates() {
	do_action( 'guten-templates' );
	wp_enqueue_script(
		'guten-templates',
		plugins_url( '/guten-templates.min.js', __FILE__ ),
		[ 'wp-blocks', 'wp-components', 'wp-element', 'wp-editor' ]
	);
}

add_action( 'enqueue_block_editor_assets', 'load_guten_templates' );
