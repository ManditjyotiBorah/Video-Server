import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
export default class ManagePage extends Component{
    
    constructor(props)
   {
       super(props);
       this.state={
           title: '',
           thumbnail : null,
           video : null
       }
       this.onChange = this.onChange.bind(this);
       this.onIFileChange = this.onIFileChange.bind(this);
       this.onVFileChange = this.onVFileChange.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
       this.onLogout = this.onLogout.bind(this);
   }
   checkLogin()
   {
       if (!localStorage.getItem('rememberMe')) {
                window.location ='/';
          }
   }
   onLogout()
   {
       localStorage.removeItem('rememberMe');
       window.location='/';
   }
   onChange(e)
   {
       this.setState({
           title : e.target.value
       });
   }
    //new code
   onIFileChange(e)
   {
       this.setState({
           thumbnail : e.target.files[0]
       });
   }
  
   onVFileChange(e)
   {
       this.setState({
           video : e.target.files[0]
       });
   }
   onSubmit(e){
       e.preventDefault();
       var formData = new FormData();
       formData.append("thumbnail",this.state.thumbnail,this.state.thumbnail.name);
       formData.append("content",this.state.video,this.state.video.name);
       formData.append("title",this.state.title);
       //new code
       
       var config = {
        headers: {
            'content-type': 'multipart/form-data'
              }
       }
       axios.post('http://localhost:4000/admin/upload-video',formData,config)
       .then(res=>{
           window.location = res.data ;
       })
       .catch(
           err=>{
               console.log(err);}
               );
   }
    render(){
       return(
         
         <div>
             {this.checkLogin()}
             <button type='submit' class="btn btn-secondary btn-lg float-right" onClick={this.onLogout}>Log out</button><br/>
               <form method='post' onSubmit={this.onSubmit}>
                <div class="form-group">
                       <label for="title">Title</label>
                       <input type="text"  name='title' onChange={this.onChange} class="form-control" id="exampleInputusername1" aria-describedby="usernameHelp" placeholder="Enter username"></input>
                </div>
                <div class="form-group">
                       <label for="thumbnail">Thumbnail File</label>
                       <input type='file' name='thumbnail' accept='image/*' onChange={this.onIFileChange} class="form-control" id="exampleInputusername1" aria-describedby="usernameHelp" placeholder="Enter username"></input>
                </div>
                <div class="form-group">
                       <label for="video">Video file (.mp4/.ogg/.webm)</label>
                       <input type='file' name='video' accept=".mp4,.ogg,.webm" onChange={this.onVFileChange} class="form-control" id="exampleInputusername1" aria-describedby="usernameHelp" placeholder="Enter username"></input>
                </div>
                 <button type='submit' class="btn btn-primary">Upload</button>
             </form>
         </div>
       );
   }
};