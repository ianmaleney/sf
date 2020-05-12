<?php

$input = file_get_contents('php://input');
$sub_data = json_decode($input);

require_once("../../../../../wp-load.php");
global $wpdb;

http_response_code(200); // PHP 5.4 or greater

$now = current_time( 'mysql' );
$userdata = array(
	'user_login' => $sub_data->user_login,
	'first_name' => $sub_data->first_name,
	'last_name' => $sub_data->last_name,
	'user_email' => $sub_data->user_email,
	'user_registered' => $now,
	'user_pass' => NULL,
	'role' => $sub_data->user_role
);

// Create New WP User
$user_id = wp_insert_user( $userdata );

// Send login details to new subscriber
wp_new_user_notification( $user_id , null, "both" );

// Return the User ID (or Error Code) to the API
if ( ! is_wp_error( $user_id ) ) {
    echo json_encode(array('wp_user_id' => $user_id));
} else {
	echo json_encode(array('wp_user_id' => 0));
}
return;