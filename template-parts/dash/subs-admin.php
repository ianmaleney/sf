<?php 
global $wpdb;
$subscribers = $wpdb->get_results(
	"Select * from stinging_fly_subscribers"
);
?>
<style>
	.subscriber {
		background-color: white;
		border-bottom: #ddd;
		display: flex;
		align-items: center;
	}
	.subscriber__span {
		border-right: 1px solid #ddd;
		padding: 8px 12px;
	}
</style>
<div class="wrap"></div>

<script src="https://unpkg.com/preact"></script>
<script>
const subscribers = <?php echo json_encode($subscribers); ?>;
console.log(subscribers);
const wrap = document.querySelector(".wrap");
const { Component, h, render } = window.preact;

/** Example classful component */
class App extends Component {
	render(props, state) {
		return (
			h('div', {id:'app'},
				h(Header, { message: state.message }),
				h(SubsList, { subscribers: subscribers })
			)
		);
	}
}

/** Components can just be pure functions */
const Header = (props) => {
	return h('header', null,
		h('h1', null, 'Subscribers')
	);
};

class SubsHeader extends Component {
	render(props) {
		const items = props.columns.map(column => (
			h('span', {class: 'column_title'}, column)
		))
		return (
			h('li', {class: 'subscriber_table__header-row'}, items)
		)
	}
}

/** Instead of JSX, use: h(type, props, ...children) */
class SubsList extends Component {
	constructor(props) {
        super();
        this.state.subs = props.subscribers;
    }

	render(props, state) {
		const items = state.subs.map(sub => (
			h('li', {id: sub.sub_id, class: 'subscriber'}, 
				h('span', {class: 'subscriber__span subscriber__name' }, sub.first_name + ' ' + sub.last_name),
				h('span', {class: 'subscriber__span subscriber__status' }, sub.sub_status),
				h('span', {class: 'subscriber__span subscriber__renewal' }, sub.next_renewal_date)
			)
		));
		return (
			h('ul', {class: 'subscriber_table'}, 
				h(SubsHeader, { columns: ['Name', 'Status', 'Renewal Date']}),
				items
			)
		);
	}
}


render(h(App), wrap);
</script>