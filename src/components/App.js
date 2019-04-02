import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  handleFilterChange = (e) => {
    console.log(e.target.value)
    this.setState({
      filters: {type: e.target.value}
    })
  }

  handleFind = (e) => {
    // fetchMock.get('/api/pets', getAll());
    // fetchMock.get('/api/pets?type=cat')
    // fetchMock.get('/api/pets?type=dog')
    // fetchMock.get('/api/pets?type=micropig')
    console.log("finding")
    let url = ""
    switch (this.state.filters.type){
      case "all":
        url = "/api/pets"
        break;
      case "cat":
        url = "/api/pets?type=cat"
        break;
      case "dog":
        url = "/api/pets?type=dog"
        break;
      case "micropig":
        url = "/api/pets?type=micropig"
        break;
      default:
        break;
    }
    fetch(url)
    .then(resp=>resp.json())
    .then(data=>this.setState({pets:data}))
  }

  handleAdoption = (id)=>{
    console.log("adopting..")
    //const newPets = new Array(this.state.pets)
    // const pet = this.state.pets.find((pet)=>pet.id===id)
    // pet.isAdopted = !pet.isAdopted
    const pets = this.state.pets.map((pet)=>pet.id === id ? {...pet, isAdopted: true} : pet)
    this.setState({pets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleFilterChange} onFindPetsClick={this.handleFind} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoption} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
