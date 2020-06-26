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
	'user_email' => $sub_data->email,
	'user_registered' => $now,
	'user_pass' => NULL,
	'role' => $sub_data->user_role
);

/////////////////////////////////
//
// Create New WP User
//
/////////////////////////////////

$user_id = wp_insert_user( $userdata );



/////////////////////////////////////////
//
// Send login details to new subscriber
//
/////////////////////////////////

wp_new_user_notification( $user_id , null, "both" );



//////////////////////////////
//
// Send Admin Email
//
//////////////////////////////

function start_setup($sub_data) {
	$sub_type = $sub_data->subscription_type;
	$start_issue = $sub_data->start_issue;
	$start_book = $sub_data->start_book;
	if ($sub_type == "magonly") {
		return "Starts with Issue " . $start_issue;
	}
	if ($sub_type == "bookonly") {
		return "Starts with " . $start_book;
	}
	if ($sub_type == "magbook") {
		return "Starts with Issue " . $start_issue . " and " . $start_book;
	}
}

function type_setup($sub_data) {
	$sub_type = $sub_data->subscription_type;
	if ($sub_type == "magonly") {
		return "Magazine";
	}
	if ($sub_type == "bookonly") {
		return "Book";
	}
	if ($sub_type == "magbook") {
		return "Magazine + Book";
	}
}

function date_setup($sub_data) {
	$date = date_create($sub_data->next_renewal_date);
	return date_format($date, 'd-m-Y');
}

// Setup variables
$name = $sub_data->first_name . " " . $sub_data->last_name;
$email = $sub_data->email;
$type = type_setup($sub_data);
$renewal = date_setup($sub_data);
$start = start_setup($sub_data);



// Mail Variables
if (site_url() === 'https://stingingfly.org') {
	$admin_to = array('web.stingingfly@gmail.com', 'stingingfly@gmail.com', 'info@stingingfly.org');
} else {
	$admin_to = array('web.stingingfly@gmail.com');
}
$admin_subject = "You've Got A New Subscriber";

// Get email template
$admin_template = file_get_contents('../email/admin-new-subscriber.php');

// Strings to look for in template
$search_strings = array('%name%', '%email%', '%type%', '%renewal_date%', '%start%');

// Strings to replace with
$replacement_strings = array($name, $email, $type, $renewal, $start);

// Replace template strings in HTML
$admin_message = str_replace($search_strings, $replacement_strings, $admin_template);

// Set Headers
$admin_headers = array('Content-Type: text/html; charset=UTF-8');

// Send Email
wp_mail($admin_to, $admin_subject, $admin_message, $admin_headers);



///////////////////////////////////////////////////
//
// Return the User ID (or Error Code) to the API
//
///////////////////////////////////////////////////

if ( ! is_wp_error( $user_id ) ) {
    echo json_encode(array('wp_user_id' => $user_id));
} else {
	echo json_encode(array('wp_user_id' => 0));
}
return;