<script>
	export let number;
	import { subscribers } from './stores.js';
	function handleSearch(e) {
		let searchterm = e.target.value;
		subscribers.filter(searchterm);
	}
	function handleSort(e) {
		let t = e.target.dataset.key.toLowerCase();
		subscribers.generalSort(t);
	}
</script>
<style>

header {
	margin-bottom: 15px;
	margin-left: 8px;
}

.filter-bar {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.filter {
	display: flex;
	align-items: center;
	margin-right: 20px;
}

.filter label {
	font-size: 13px;
	font-weight: bold;
	margin-right: 8px;
}

#sub-search-input {
	border: none;
	font-size: 13px;
	line-height: 13px;
}

.sort span {
	font-size: 13px;
}
.sub-sort-button {
	background-color: rgba(255,255,255,0);
	border: none;
	color: rgb(0,100,200);
	border-right: 1px solid #9E9E9F;
	padding: 0 8px 0 7px;
	border-radius: 0;
	box-sizing: border-box;
	margin: 8px 0;
	font-size: 13px;
}

.sub-sort-button:hover {
	color: rgba(0,100,200,0.8);
	text-decoration: underline;
	cursor: pointer;
}
.sub-sort-button:last-child {
	border-right: none
}

</style>

<header>
<h1>{number} Subscribers</h1>

<div class="filter-bar">
	<div class="filter">
		<label for="sub-search-input">Search Subscribers:</label>
		<input id="sub-search-input" type="text" on:input={handleSearch}/>
	</div>
	<div class="sort">
		<span><strong>Order By:</strong></span>
		<button class="sub-sort-button" data-key="first_name" on:click={handleSort}>Name</button>
		<button class="sub-sort-button" data-key="email" on:click={handleSort}>Email</button>
		<button class="sub-sort-button" data-key="date_start" on:click={handleSort}>Date Subscribed</button>
		<button class="sub-sort-button" data-key="start_issue" on:click={handleSort}>Starting Issue</button>
		<button class="sub-sort-button" data-key="sub_status" on:click={handleSort}>Status</button>
		<button class="sub-sort-button" data-key="gift" on:click={handleSort}>Gift</button>
	</div>
</div>
</header>