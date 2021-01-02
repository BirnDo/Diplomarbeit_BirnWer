import React, { Component } from "react";
import Test from "./Test";
import api from "../api";

export default class Tests extends Component {
  constructor() {
    super();
    this.state = { tests: [] };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <ul>
          {this.state.tests.map((test) => {
            <Test test={test} />;
          })}
        </ul>
      </div>
    );
  }
}
