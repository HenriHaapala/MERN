import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    update:null,
    add:null,
    id:null,
    name:""
  }



  updateModalState = (id,name) => {
    this.setState({
      add:false, update:true, id, name
    });
  }

  addModalState = () => {
    this.setState({
      add:true, update:false, id:null, name:""
    });
  }

  resetStates = () => {
    this.setState({
      add:null, update:null, id:null, name:""
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal
              update={this.state.update}
              add={this.state.add}
              id={this.state.id}
              name={this.state.name}
              toggle={this.addModalState}
              resetStates={this.resetStates}
            />
            <ShoppingList
            updateModalState={this.updateModalState}
            />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
