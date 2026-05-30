<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache


/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'casua9_wp87' );

/** Database username */
define( 'DB_USER', 'casua9_wp87' );

/** Database password */
define( 'DB_PASSWORD', '89VSN!Kp[9' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'fzlo4fsaabueinaerdgdhlentd1ju3vhj1dcekjm57twavo92tdvwo6eubbg4voo' );
define( 'SECURE_AUTH_KEY',  'cdgbegtvgfsfhinc40xdu1fbphhp5eqvzku1hmrid63htxznn3qbg6qkmviqrmc0' );
define( 'LOGGED_IN_KEY',    'ohyegqhuvoshtmcbrdmdijpoxwe07uaoujaq8gwwooc0n1yyuujyzik9bpbsos2t' );
define( 'NONCE_KEY',        'kr7dzitjvi0kexwrtxlr6sbl799yapnlpbb3wtfoidnfvckhed1kfbyphyh3xjgs' );
define( 'AUTH_SALT',        'xqtfyfnungzgynxdxpz1ebnhlbwkiswwc4srgp2fvaqlajdh68ndxtqdedboxqrg' );
define( 'SECURE_AUTH_SALT', 'zlm1eordatog0lckaghatvgxnuezftyhiduengokd4qznlcffr3npxd77dwhmoxi' );
define( 'LOGGED_IN_SALT',   'ju6jzeti5amjrvb0zvqbkdhjljwbrnaysmmd9ihm6t6n7hturqpvweoxvoafr9eu' );
define( 'NONCE_SALT',       'onrhzimgth4utat9xjnyb8efgtbylb10spqn6qwzvu6aqvawuqfmhijaxfus4src' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wpnc_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
