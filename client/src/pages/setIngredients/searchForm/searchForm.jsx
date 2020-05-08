import React from 'react';
import SearchBar from './searchBar'
import AutoComplete from './autoComplete'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class searchForm extends React.Component {

  constructor(){
    super();
    this.state ={
          value:"",
          selected:false,
          focus:false,
          mouseOnAuto: false,
          suggestions:[]
        }       
  }

  //handling input on search bar (change value and search for autocomplete suggestions)
  handleInput= async (val)=>{
    this.setState({selected: null, value:val});
    if (val!=="")
    {
      let response= await fetch("/auto/"+val);
      let suggestions=await response.json();
      suggestions.forEach((sug)=>{ //first letter will be capital
        sug.name=sug.name[0].toUpperCase()+sug.name.slice(1);
      })
      this.setState({suggestions:suggestions})
    }
    else
    {
      this.setState({suggestions:[]});
    }
  }

  //handle add button
  btnHandleClick=()=>{
    let ing=this.state.selected;
    this.props.addIngredient(ing);
    this.setState({value: "", suggestions:[], selected: false});
  }

  //toggle focus if the search bar is focused or blured
  toggleFocus=()=>{
   if (!this.state.mouseOnAuto) //toggle only if mouse is not hovering on autocomplete
    this.setState({focus:!this.state.focus})
  }

  //toggle the "mouse is on auto" if the mouse is entering or leaving the autocomplete
  handleMouseEnterAuto=()=>{
    this.setState({mouseOnAuto:true})
  }
  handleMouseLeaveAuto=()=>{
    this.setState({mouseOnAuto:false})
  }

  //chosing a suggestion if clicked
  suggestionHandleClick=(sug)=>{
    let selected;
    if (!this.isInIngredients(sug))
      selected=sug;
    else
      selected= false;
    this.setState({selected: selected, value:sug.name, suggestions:[] })
  }

  //decied if an ingredient is already chosen
  isInIngredients(sug){
    let size=this.props.ingredients.length;
    for (let i=0; i<size; i++){
      if (sug.name===this.props.ingredients[i].name)
        return true;
    }
    return false;
  }

  //decied if autocomplete should be rendered (only if search bar is focused)
  autoComplete=()=>{
    if (this.state.focus)
    return(
      <AutoComplete className="searchCol" suggestions={this.state.suggestions} handleClick={this.suggestionHandleClick} handleMouseEnter={this.handleMouseEnterAuto} handleMouseLeave={this.handleMouseLeaveAuto} />
    )
  }

  

  render(){
  return (
    <Row>
      <Col  m={10} sm={9} xs={8}>
        <form>
        <SearchBar  value={this.state.value} handleInput={this.handleInput} toggleFocus={this.toggleFocus} />
        {this.autoComplete() /*render only if search bar is focused*/}
        </form>
      </Col>
      <Col >
        <button 
        disabled={!this.state.selected} 
        onClick={this.btnHandleClick}>
          Add
        </button>
      </Col>
    </Row>
  )
  }
}
export default searchForm;