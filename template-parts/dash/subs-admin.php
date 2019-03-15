<?php 
global $wpdb;
$subscribers = $wpdb->get_results("Select * from stinging_fly_subscribers ORDER BY next_renewal_date");
?>
<script>
var new_subscribers = <?php echo json_encode($subscribers); ?>;
</script>

<style>
	.subscriber_table {
		--grid-columns: 25% 25% 10% 20% 20%;
		display: flex;
		flex-direction: column;
		/* Supports Grid */
		display: grid;
		grid-template-columns: var(--grid-columns);
	}
	.subscriber_table__row, .subscriber_table__header-row {
		display: flex;
		align-items: center;
		background-color: white;
		border-bottom: #ddd;
		/* Supports Grid */
		display: grid;
		grid-template-columns: var(--grid-columns);
		grid-column: 1 / -1;
		margin-bottom: 2px;
	}
	.subscriber__span, .column_title {
		flex: 1 0 20%;
		border-right: 1px solid #ddd;
		padding: 8px 12px;
	}
	.column_title {
		font-weight: bold;
	}
	.column_title:hover {
		cursor: pointer;
		color: blue;
	}
	.filter-box__title {
		margin-right: 8px;
	}
</style>
<div class="wrap"></div>