import React from 'react';

class searchBar extends React.Component {
  
  //update only if the value is changed
  shouldComponentUpdate(nextProps, nextState){
   return (this.props.value!==nextProps.value);
  }


  render(){
    return (
        <input
           type="text" 
           placeholder="Enter Indgridient" 
           onChange={event=>this.props.handleInput(event.target.value)}
           onFocus={this.props.toggleFocus}
           onBlur={this.props.toggleFocus}
           value={this.props.value}>
        </input>

    )
   }
}
export default searchBar;
