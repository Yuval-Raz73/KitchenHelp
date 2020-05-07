import React from 'react';

class Recipies extends React.Component {
    constructor(){
      super();
      this.state={
        recipies:[]
      }
    }
    async componentDidMount()
    {
        let ings="";

        this.props.ingredients.forEach(ing => {
            ings+=ing.name+',';
        });

        if (ings!=="")
        {
            ings=ings.slice(0,-1);
        }
        
        let response= await fetch("/getRecipies/"+ings);
        let recipies= await response.json();
        this.setState({recipies:recipies})
    }
    
    render(){
    return (
        <div>
            <h1>Recipies for</h1>
            {this.props.ingredients.map(ing=>
                {
                    return (
                    <h3>
                        {ing.name}
                    </h3>
                    )
                })}
            {this.state.recipies.map(recipe=>
                {
                    return(
                        <p>{recipe.title}</p>
                    )
                })}
        </div>
    );
    }
  }

  export default Recipies;