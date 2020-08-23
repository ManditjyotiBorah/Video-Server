import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Video= (props)=>( 

                <div>
                <Link to={"/watch/"+props.video._id}> <img width='300' height='300' src={props.video.thumbnail} alt='logo'/> </Link>
                <label>{props.video.title}</label>
               </div>
    
    )
   

export default class list extends Component{
constructor(props){
    super(props);
    this.state={
        videos : []
    }
}
componentDidMount()
{ 
  axios.get('http://localhost:4000/user/list')
  .then(res=>{
      this.setState({
          videos : res.data
      })
  })
  .catch(err=>{
      console.log(err);
  })
}
videoList(){
    return this.state.videos.map(currentVideo=>{
        return <Video video={currentVideo} key={currentVideo._id}/>;
    });
}
  render(){
      return(
          <div>
              {this.videoList()}
          </div>
      )
  }
}