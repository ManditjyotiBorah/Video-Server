import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
export default class LoginPage extends Component{
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
    {   console.log("okay")
        e.preventDefault();
        axios.post('http://localhost:4000/admin/login',{ username: this.state.username ,
        password : this.state.password })
       .then(res => {
          localStorage.setItem("rememberMe",true)
          window.location = res.data;
      })
     .catch(err => {
          console.log(err);
      });
    }
   render(){
       return (
        <div>
               <form method='post' onSubmit={this.onSubmit}>
                   <div class="form-group">
                       <label for="username">Username</label>
                       <input type="text" name='username' onChange={this.onChange} class="form-control" id="exampleInputusername1" aria-describedby="usernameHelp" placeholder="Enter username"></input>
                   </div>
                   <div class="form-group">
                       <label for="password">Password</label>
                       <input type="password" name='password' onChange={this.onChange} class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                   </div>
                   <button type="submit" class="btn btn-primary">Log In</button>
               </form>
        </div>
       )
   }
}