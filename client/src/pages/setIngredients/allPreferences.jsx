import React from 'react';
import Container from 'react-bootstrap/Container'
import SearchForm from './searchForm/searchForm'
import AllIngredients from './allIngredients'
import {
  Link,
  Redirect
} from "react-router-dom";


class AllPrefrences extends React.Component {

  handleSearchClick=()=>{
    this.props.setIngredients(this.props.ingredients)
  }
  render(){
    return (
    <Container  className="cont">
      <div id="searchForm">
        <SearchForm 
           ingredients={this.props.ingredients} 
           addIngredient={this.props.addIngredient}/>
           <AllIngredients
            ingredients={this.props.ingredients}
            deleteIngredient={this.props.deleteIngredient}/>
       </div>
       <Link id="searchButton" to="/recipies" disabled={this.props.ingredients.length===0}>
          Search
      </Link>
</Container>
  );
  }
}
export default AllPrefrences;
