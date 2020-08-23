import React, { Component } from 'react';
import axios from 'axios';
export default class login extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            username : '',
            password : ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e)
    {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit(e)
    {
        e.preventDefault();
        axios.post('http://localhost:4000/admin/login',{ username: this.state.username ,
     password : this.state.password })
      .then(res=>{
          window.location = res.data;
      })
      .catch(err=>{
          console.log(err);
      });
    }
   render(){
       return(
           <div>
               <form method='post' onSubmit={this.onSubmit}>
                   <input type='text' name='username' onChange={this.onChange}/><br/>
                   <input type='password' name='password' onChange={this.onChange}/><br/>
                   <button type='submit'>log in</button>
               </form>
           </div>
       )
   }
}