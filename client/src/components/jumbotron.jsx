import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

class Jumbo extends React.Component {
  shouldComponentUpdate(){
    return false;
  }
  render(){
  return (
<Jumbotron className="jumbo">
  <h1 >Welcome To Kitchen Help!</h1>
  <p>
    Tell us what you have at home, we will tell you what you can make!
  </p>
</Jumbotron>
  );
  }
}

export default Jumbo;
