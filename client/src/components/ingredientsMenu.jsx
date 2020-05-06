import React from 'react';
import Jumbo from './jumbotron'
import AllPrefrences from './allPreferences'
import Container from 'react-bootstrap/Container'
import SpoonacularAPI from "../spoonnacularAPI"

class IngredientsMenu extends React.Component {

  constructor(props){
    super(props);
    this.state={
      ingredients:this.props.ingredients
    }
  }
  //methods for managing ingredients
  addIngredient=(ing)=>{
    let ings=this.state.ingredients;
    ing.image=SpoonacularAPI.getImageURL(ing.image);
    ings.push(ing);
    this.setState({ingredients: ings})
  }
  deleteIngredient=(index)=>{
    let ings=this.state.ingredients;
    ings.splice(index,1);
    this.setState({ingredients: ings})
  }
  render(){
  return (
    <div>
      <Jumbo />
      <Container>
      <AllPrefrences
        ingredients={this.state.ingredients}
        addIngredient={this.addIngredient}
        deleteIngredient={this.deleteIngredient}
        setIngredients={this.props.setIngredients}/>
      </Container>
    </div>
  );
  }
}

export default IngredientsMenu;
