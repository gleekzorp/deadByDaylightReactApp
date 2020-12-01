import React, { Component } from "react";
import axios from "axios";

export default class KillerPerk extends Component {
  constructor() {
    super();
    this.state = {
      killerPerks: [],
      randomPerk: [],
    };
  }

  getkillerPerks = () => {
    axios
      .get("http://localhost:5000/killer-perks")
      .then((response) => {
        console.log("grabbing killer perks", response.data);
        this.setState({
          killerPerks: this.state.killerPerks.concat(response.data),
        });
        return this.state.killerPerks;
      })
      .catch((error) => {
        console.log("Error grabbing killer perks", error);
      });
  };

  randomKillerPerk = () => {
    const randPerk = this.state.killerPerks[
      Math.floor(Math.random() * this.state.killerPerks.length)
    ];
    console.log(randPerk);
    return this.setState({
      randomPerk: randPerk,
    });
  };

  componentDidMount() {
    this.getkillerPerks();
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.randomKillerPerk}>Roll Perk</button>

          <h3>{this.state.randomPerk.name}</h3>
          <h5>Teachable : {this.state.randomPerk.teachable}</h5>
          <p>{this.state.randomPerk.description}</p>
        </div>
      </div>
    );
  }
}
