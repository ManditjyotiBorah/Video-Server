import React, { Component } from 'react';
import axios from 'axios';

export default class admin extends Component{
    
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
    axios.get('http://localhost:4000/admin/checkLogin')
    .then(res=>{
        if(res.data.check){
            window.location ='/login';
        }
    })
    .catch(err=>console.log(err));
   }
   onLogout()
   {
       axios.get('http://localhost:4000/admin/logout');
       window.location='/login';
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
       formData.append("videofile",this.state.video,this.state.video.name);
       formData.append("title",this.state.title);
       //new code
       
       var config = {
        headers: {
            'content-type': 'multipart/form-data'
              }
       }
       axios.post('http://localhost:4000/admin/upload',formData,config)
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
             <button type='submit' onClick={this.onLogout}>Log out</button><br/>
             <form onSubmit={this.onSubmit}>
                 <label>Title : </label><input type='text' name='title' onChange={this.onChange}/><br/>
                 {/* new code */}
                 <label>thumbnail file : </label><input type='file' name='thumbnail' accept='image/*' onChange={this.onIFileChange}/><br/>
                 <label>Video file (.mp4/.ogg/.webm) : </label><input type='file' name='video' accept=".mp4,.ogg,.webm" onChange={this.onVFileChange}/><br/>
                 <button type='submit'>Upload</button>
             </form>
         </div>
       );
   }
};