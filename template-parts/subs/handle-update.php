<?php

$input = file_get_contents('php://input');
$sub_data = json_decode($input);

require_once("../../../../../wp-load.php");
global $wpdb;

http_response_code(200); // PHP 5.4 or greater

$update_user = wp_update_user( array( 'ID' => $sub_data->wp_user_id, 'role' => 'active_subscriber' ) );

if ( is_wp_error( $update_user ) ) {
	// There was an error, probably that user doesn't exist.
	echo json_encode([
		"message" => "There was an error: that user doesn't exist."
	]);
	return;
} else {
	// Success!
	echo json_encode([
		"message" => "User Updated"
	]);
	return;
}
