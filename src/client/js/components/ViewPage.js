import React from 'react';

import StandardViewGrid from "./viewgrids/StandardViewGrid";
import VerticalViewGrid from "./viewgrids/VerticalViewGrid";

export default class ViewPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        activeState: null
    }
  }
  changeActive(active){
    this.setState({...this.state, activeState: active});
  }
  render(){
    switch(this.state.activeState){
        case null:
          return(
              <div>
                <button onClick={this.changeActive.bind(this, "standard")}>Standard</button>
                <button onClick={this.changeActive.bind(this, "vertical")}>Vertical</button>
              </div>
          );
        case "standard":
          return(
              <StandardViewGrid/>
          );
        case "vertical":
          return (
              <VerticalViewGrid/>
          )
    }
  }
}
