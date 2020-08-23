import React,{Component} from 'react';


export default class watch extends Component{
    // constructor(props)
    // {
    //     super(props);
        
    // }
    
    
    render()
    {
        return(
            <div>
              <video controls>
                 <source src={'http://localhost:4000/user/watch/'+this.props.match.params.id}/>
              </video>
            </div>
        )
    }
}