const wrap = document.querySelector(".wrap");
const { Component, h, render } = window.preact;

compareFirstNames = (a, b) => a.first_name.localeCompare(b.first_name);
compareEmails = (a, b) => a.email.localeCompare(b.email);
compareStatus = (a, b) => a.sub_status.localeCompare(b.sub_status);
compareDate = (a, b) => a.next_renewal_date.localeCompare(b.next_renewal_date);

/** Example classful component */
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      init_subscribers: window.new_subscribers,
      subscribers: window.new_subscribers
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(term) {
    switch (term) {
      case "name":
        this.setState({
          subscribers: this.state.subscribers.sort(compareFirstNames)
        });
        break;
      case "email":
        this.setState({
          subscribers: this.state.subscribers.sort(compareEmails)
        });
        break;
      case "status":
        this.setState({
          subscribers: this.state.subscribers.sort(compareStatus)
        });
        break;
      case "renewal date":
        this.setState({
          subscribers: this.state.subscribers.sort(compareDate)
        });
        break;

      default:
        this.setState({
          subscribers: this.state.init_subscribers
        });
        break;
    }
  }

  handleSearch(searchterm) {
    if (searchterm === "") {
      this.setState({ subscribers: this.state.init_subscribers });
      return;
    }
    let subs = this.state.init_subscribers;
    let filtered = subs.filter(sub => {
      let searchable = `${sub.first_name} ${sub.last_name} ${sub.email}`;
      if (searchable.toLowerCase().includes(searchterm.toLowerCase())) {
        return true;
      }
    });
    this.setState({ subscribers: filtered });
  }

  render(props, state) {
    let s = state.subscribers;
    return h(
      "div",
      { id: "app" },
      h(Header, {
        subscribers: s.length
      }),
      h(Filter, {
        onInputChange: this.handleSearch
      }),
      h(SubsList, { subscribers: s, handleSort: this.handleSort })
    );
  }
}

/** Components can just be pure functions */
const Header = props => {
  let headline = `${props.subscribers} Subscribers`;
  return h("header", null, h("h1", null, headline));
};

class Filter extends Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    return h(
      "div",
      {
        class: "filter-box"
      },
      h(
        "span",
        {
          class: "filter-box__title"
        },
        "Search Subscribers:"
      ),
      h("input", {
        class: "filter-box__input",
        onKeyUp: this.handleChange
      })
    );
  }
}

class SubsHeader extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onSortChange(e.target.innerHTML.toLowerCase());
  }

  render(props) {
    const items = props.columns.map(column =>
      h("span", { class: "column_title", onClick: this.handleClick }, column)
    );
    return h(
      "li",
      { class: "subscriber_table__row subscriber_table__header-row" },
      items
    );
  }
}

/** Instead of JSX, use: h(type, props, ...children) */
class SubsList extends Component {
  constructor(props) {
    super();
    this.handleHeadingClick = this.handleHeadingClick.bind(this);
  }

  handleHeadingClick(term) {
    this.props.handleSort(term);
  }

  render(props, state) {
    const items = props.subscribers.map(sub =>
      h(
        "li",
        { id: sub.sub_id || sub.id, class: "subscriber_table__row" },
        h(
          "span",
          { class: "subscriber__span subscriber__name" },
          sub.name || sub.first_name + " " + sub.last_name
        ),
        h(
          "span",
          { class: "subscriber__span subscriber__name" },
          h(
            "a",
            { href: `mailto:${sub.email || sub.user_email}` },
            sub.email || sub.user_email
          )
        ),
        h(
          "span",
          { class: "subscriber__span subscriber__status" },
          sub.status || "Old"
        ),
        h(
          "span",
          { class: "subscriber__span subscriber__renewal" },
          new Date(sub.next_renewal_date).toLocaleDateString()
        ),
        h(
          "span",
          { class: "subscriber__span subscriber__renewal" },
          sub.address_one +
            ", " +
            sub.address_two +
            ", " +
            sub.city +
            ", " +
            sub.country +
            ", " +
            sub.postcode
        )
      )
    );
    return h(
      "ul",
      { class: "subscriber_table" },
      h(SubsHeader, {
        columns: ["Name", "Email", "Status", "Renewal Date", "Address"],
        onSortChange: this.handleHeadingClick
      }),
      items
    );
  }
}

render(h(App), wrap);
