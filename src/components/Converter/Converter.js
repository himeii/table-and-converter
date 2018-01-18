import React, { Component } from "react";
import * as http from "axios";
import Dropdown from "./Dropdown";
import Spinner from "../shared/Spinner";
import "./styles/Converter.css";

class Converter extends Component {
  state = {
    currencies: [],
    multiplier: 1,
    from: "",
    to: "",
    from_num: 0,
    to_num: 0
  };

  componentWillMount() {
    http.get("https://api.fixer.io/latest").then(response => {
      console.log(response);

      this.setState({
        currencies: Object.keys(response.data.rates),
        from: Object.keys(response.data.rates)[0],
        to: Object.keys(response.data.rates)[0]
      });
    });
  }

  recalculate = () => {
    this.setState({
      to_num: (this.state.from_num * this.state.multiplier).toFixed(2)
    });
  };

  handleFrom = item => {
    http
      .get(`https://api.fixer.io/latest?base=${item}`)
      .then(res => {
        console.log(res);
        this.setState({
          from: item,
          multiplier: res.data.rates[this.state.to]
          // to_num: this.state.from_num * this.state.multiplier
        });
        this.recalculate();
      })
      .catch(res => {
        console.log(res);
      });
  };

  handleTo = item => {
    http
      .get(`https://api.fixer.io/latest?base=${this.state.from}`)
      .then(res => {
        console.log(res);
        this.setState({
          to: item,
          multiplier: res.data.rates[item]
          // to_num: this.state.to_num * this.state.multiplier
        });
        this.recalculate();
      })
      .catch(res => {
        console.log(res);
      });
  };

  change = e => {
    const name = e.target.name;
    let value = e.target.value;
    console.log(value);

    switch (name) {
      case "from_num": {
        this.setState({ to_num: (+value * this.state.multiplier).toFixed(2) });
        break;
      }
      case "to_num": {
        this.setState({
          from_num: (+value / this.state.multiplier).toFixed(2)
        });
        break;
      }
      default: {
        break;
      }
    }
    if (value.startsWith("0")) {
      value = value.replace("0", "");
    }
    if (/[a-zA-Zа-яA-Я]+/g.test(value)) {
      console.log("exists");
      value = value.replace(/[a-zA-Zа-яA-Я]+/g, "");
    }
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        {this.state.currencies.length > 0 ? (
          <div className="converter">
            <div className="inputs convert-from">
              <Dropdown data={this.state.currencies} handle={this.handleFrom} />
              <input
                type="text"
                name="from_num"
                id=""
                onChange={this.change}
                value={this.state.from_num}
              />
            </div>
            <div className="inputs convert-to">
              <input
                type="text"
                name="to_num"
                id=""
                onChange={this.change}
                value={this.state.to_num}
              />
              <Dropdown data={this.state.currencies} handle={this.handleTo} />
            </div>

            <h1>{this.state.multiplier}</h1>
            <h2>{this.state.from_num}</h2>
            <h2>{this.state.to_num}</h2>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default Converter;
