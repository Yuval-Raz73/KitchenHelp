import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Ingredient from './ingredient'

class AllIngredients extends React.Component {

  renderIngredient(ing,index){
    return(
        <Col key={index} lg={2}  md={3} xs={4}>
          <Ingredient index={index} ing={ing} deleteIngredient={this.props.deleteIngredient} />
        </Col>
        )
    }

  render(){
    return (
        <Row id="ingredients">
          {this.props.ingredients.map((ing,index)=>{
            return this.renderIngredient(ing,index);
           })}
        </Row>
    )
  }
}
export default AllIngredients;
