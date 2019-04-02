import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  changeType = e => {
    // console.log(e.target.value)
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    });
  };

  handleFindPetsClick = e => {
    // console.log('hi')
    let path = "/api/pets";

    if (this.state.filters.type !== "all")
      path += `?type=${this.state.filters.type}`;

    fetch(path)
      .then(response => response.json())
      .then(console.log);
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.handleFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
