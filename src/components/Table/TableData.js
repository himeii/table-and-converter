import React, { Component } from "react";
import * as http from "axios";
import Person from "./Person";
import Spinner from "../shared/Spinner";

class TableData extends Component {
  state = {
    users: [],
    empty: true,
    loaded: false
  };

  componentWillMount() {
    http
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        this.setState({ empty: !Object.keys(response.data), loaded: true });
        this.setState({ users: response.data });
      })
      .catch(this.setState({ empty: true, loaded: true }));
  }

  removePerson = id => {
    console.log(id);
    this.setState({ users: this.state.users.filter(user => user.id !== id) });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="table">
        {this.state.loaded ? (
          this.state.empty ? (
            <p className="error">There is nobody yet!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Website</th>
                  <th>Company</th>
                </tr>
              </thead>
              {
                <tbody>
                  {users.map(user => (
                    <Person
                      key={user.id}
                      user={user}
                      removePerson={this.removePerson}
                    />
                  ))}
                </tbody>
              }
            </table>
          )
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default TableData;
