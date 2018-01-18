import React, { Component } from "react";
import "./styles/Dropdown.css";

class Dropdown extends Component {
  state = {
    selected: ""
  };

  componentWillMount() {
    console.log(this.props.data[0]);
    console.log(this.props.data);
    this.setState({ selected: this.props.data[0] });
  }

  change(element) {
    this.setState({ selected: element });
    this.props.handle(element);
  }

  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.state.selected}
        </button>
        <ul
          className="dropdown-menu scrollable"
          aria-labelledby="dropdownMenuButton"
        >
          {this.props.data.map(element => (
            <li
              key={element}
              className="dropdown-item"
              onClick={e => this.change(element)}
            >
              {element}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
