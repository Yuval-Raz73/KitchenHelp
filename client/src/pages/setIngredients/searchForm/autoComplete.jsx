import React from 'react';
import MyArray from '../../../myArray'
class AutoComplete extends React.Component {

  //update only if the the suggestions have change
  shouldComponentUpdate(nextProps,nextState){
    return !MyArray.compareByKey(nextProps.suggestions, this.props.suggestions, "name")
  }

  //render suggestion
  getSuggestion(sug, index){
    return(
      <li
        className="sug"
        key={index}
        onClick={()=>this.props.handleClick(sug)}>
        {sug.name}
      </li>
    )
  }

  render(){
    return (
      <ul  id="autoComplete"  onMouseEnter={this.props.handleMouseEnter} onMouseLeave={this.props.handleMouseLeave}>
        {this.props.suggestions.map((sug,index)=>this.getSuggestion(sug,index))}
      </ul>
    ) 
  }
}
export default AutoComplete;
