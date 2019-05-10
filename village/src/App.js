import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount(){
    axios
    .get('http://localhost:3333/smurfs')
    .then(response => {
        this.setState(() => ({smurfs: response.data}));
    })
    .catch(error => {
        console.error('Server Error', error);
    })
}

addHandler = smurf => {
  axios
  .post('http://localhost:3333/smurfs', smurf)
  .then(res => {
    this.setState(({smurfs: res.data}))
    console.log(res)
    this.props.history.push('/')


  })
  .catch(err => console.log(err))
}

deleteHandler = (e,id) => {
  e.preventDefault();
  axios
  .delete(`http://localhost:3333/smurfs/${id}`)
  .then(res => {
    this.setState(({smurfs: res.data}))
    console.log(res)
    this.props.history.push('/')


  })
  .catch(err => console.log(err))
}

  render() {
    return (
      <div className="App">
       <Route exact path ="/smurf-form" render={props => <SmurfForm {...props} addHandler={this.addHandler} /> } />
        <Link to = "/smurf-form">Add Form</Link>
        <SmurfForm addHandler = {this.addHandler} />
        <Route exact path = "/" render={props => <Smurfs {...props} smurfs={this.state.smurfs} deleteHandler={this.deleteHandler} /> } />
        

      </div>
    );
  }
}

export default App;
