import React from 'react';

class Ingredient extends React.Component {
  constructor(){
    super();
    this.state={
      hover:false
    }
  }
  //methods to manage hover in order to decide if to show x button
  handleMouseEnter(){
    this.setState({hover:true});
  }
  handleMouseLeave(){
    this.setState({hover:false});
  }

  //method to delete ingredient if the x button is clicked
  handleClick(){
    this.props.deleteIngredient(this.props.index);
  }

  //a method to manage x button appearance
  xButton(){
    if (this.state.hover)
      return <button onClick={this.handleClick.bind(this)}>X</button>
  }

  render(){
  return (
    <div className="single"
      key={this.props.index}
      onMouseEnter={this.handleMouseEnter.bind(this)} 
      onMouseLeave={this.handleMouseLeave.bind(this)}>
    {this.xButton() /*will render x button only if the mouse is over the component*/} 
    <img
      src={this.props.ing.image}
      alt={this.props.ing.image}
     />
    <h6>{this.props.ing.name}
    </h6>
    </div>
  );
  }
}

export default Ingredient;

