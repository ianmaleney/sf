const wrap = document.querySelector(".wrap");
const { Component, h, render } = window.preact;
let baseURL = "/wp-json/wp/v2/users?context=view&per_page=100&role=subscriber";

/** Example classful component */
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      subscribers: [],
      page: 1
    };
    this.backgroundFetch = this.backgroundFetch.bind(this);
  }

  handleSearch(searchterm) {
    console.log(searchterm);
    let subs = this.state.subscribers;
    let filtered = subs.filter(sub => {
      if (sub.contains(searchterm)) {
        return true;
      }
    });
    this.setState({ subscribers: filtered });
  }

  async backgroundFetch(page, url, array) {
    let result = await fetch(`${url}&page=${page}`);
    let data = await result.json();
    data.forEach(sub => {
      array.push(sub);
    });
    if (data.length !== 100) {
      let fullArray = array.concat(new_subscribers).reverse();
      this.setState({ subscribers: fullArray });
      return;
    } else {
      this.setState({ subscribers: array });
      let next = page + 1;
      this.backgroundFetch(next, url, array);
    }
  }

  async componentDidMount() {
    let subsArray = [];
    this.backgroundFetch(this.state.page, baseURL, subsArray);
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
      h(SubsList, { subscribers: s })
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
    console.log(e.target.value);
    this.props.onInputChange(e.target.value);
  }

  render() {
    return h("input", {
      onChange: this.handleChange
    });
  }
}

class SubsHeader extends Component {
  render(props) {
    const items = props.columns.map(column =>
      h("span", { class: "column_title" }, column)
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
  }

  render(props, state) {
    const items = props.subscribers.map(sub =>
      h(
        "li",
        { id: sub.sub_id || sub.id, class: "subscriber_table__row" },
        h(
          "span",
          { class: "subscriber__span subscriber_id" },
          sub.sub_id || sub.id
        ),
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
          sub.sub_status || "Old"
        ),
        h(
          "span",
          { class: "subscriber__span subscriber__renewal" },
          sub.next_renewal_date
        )
      )
    );
    return h(
      "ul",
      { class: "subscriber_table" },
      h(SubsHeader, {
        columns: ["ID", "Name", "Email", "Status", "Renewal Date"]
      }),
      items
    );
  }
}

render(h(App), wrap);
