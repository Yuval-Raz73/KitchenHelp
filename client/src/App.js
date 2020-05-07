import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.scss';
import IngredientsMenu from "./pages/setIngredients/ingredientsMenu";
import Recipies from "./pages/recipies/recipies"

class App extends React.Component {
  constructor(){
    super();
    this.state={
      ingredients:[]
    }
  }

  componentDidUpdate(){
    this.state.ingredients.forEach(ing=>
      console.log(ing.name+' ')
    )
  }
  setIngredients=(ings)=>{
    this.setState({ingredients:ings});
  }
  
  render(){
  return (
    <Router className="app">
      <Switch>
        <Route exact path="/">
          <IngredientsMenu ingredients={this.state.ingredients} setIngredients={this.setIngredients}/>
        </Route>
        <Route exact path="/recipies">
          <Recipies ingredients={this.state.ingredients}/>
        </Route>
      </Switch>
    </Router>
  );
  }
}

export default App;
