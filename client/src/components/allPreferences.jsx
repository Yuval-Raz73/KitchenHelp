import React from 'react';
import Container from 'react-bootstrap/Container'
import SearchForm from './searchForm/searchForm'
import AllIngredients from './allIngredients'


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
      <button 
        id="searchButton"
        onClick={this.handleSearchClick}
        disabled={this.props.ingredients.length===0 /*the search button will be disabled if there are no chosen ingredients*/}>
         Search
      </button>
</Container>
  );
  }
}
export default AllPrefrences;
