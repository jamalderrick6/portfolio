import React from 'react'
import PorfolioComponents  from './portfolio';

class PortfolioApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <main>
        <PorfolioComponents/>
      </main>
    )
  }
}

export default PortfolioApp;
