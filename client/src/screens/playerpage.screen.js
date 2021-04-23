import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";

export default class watch extends Component{
    constructor(props)
    {
        super(props);
        
    }
    render()
    {
        return(
            <div class="embed-responsive embed-responsive-16by9">
              <video controls>
                 <source src={this.props.location.link}/>
              </video>
            </div>
        )
    }
}