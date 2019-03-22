import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import './../images/tr_green.svg'
import green1 from './../images/tr_green.svg'
import green2 from './../images/bl_green.svg'
import C2CLogo from './c2clogo.js'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import url from './url.js'

let BASE_URL=url.initial

class Login extends Component{
    state={
        username:'',
        password:''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    login=()=>{
        let obj={
            username:this.state.username,
            password:this.state.password
        }

        console.log(obj)
        let params=new URLSearchParams()
        params.append('username',this.state.username)
        params.append('password',this.state.password)
        axios.post(BASE_URL+'/login',params).then((res)=>{
            console.log(res.data)
            localStorage.setItem('c2c_judge_auth',res.data.token)
            localStorage.setItem('c2c_judge_name',res.data.name)

            window.location.href="/team_number"
        })
    }

    render(){
        return(
            <div className="login_div center">
                {/* <img className="green1" src={green1} />
                <img className="green2" src={green2} /> */}

                <C2CLogo />

                <input type="text" className="username_input" placeholder="Username" onChange={this.handleChange('username')}/><br></br>
                <input type="password" className="password_input" placeholder="Password" onChange={this.handleChange('password')}/><br></br>


                <Button onClick={this.login} className="login_btn">LOGIN</Button>
            </div>
        )
    }
}

export default Login
