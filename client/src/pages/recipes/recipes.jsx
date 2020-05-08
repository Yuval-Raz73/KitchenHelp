import React from 'react';

class Recipes extends React.Component {
    constructor(){
      super();
      this.state={
        recipes:[]
      }
    }
    async componentDidMount()
    {
        const ingredientsString= this.props.ingredients.map(ing=>ing.name).join(',');
        let response= await fetch("/getRecipes/"+ingredientsString);
        let recipes= await response.json();
        this.setState({recipes:recipes})
    }
    
    render(){
    return (
        <div>
            <h1>Recipes for</h1>
            {this.props.ingredients.map(ing=>
                {
                    return (
                    <h3>
                        {ing.name}
                    </h3>
                    )
                })}
            {this.state.recipes.map(recipe=>
                {
                    return(
                        <p>{recipe.title}</p>
                    )
                })}
        </div>
    );
    }
  }

  export default Recipes;