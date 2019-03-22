import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import './../images/tr_green.svg'
import green1 from './../images/tr_green.svg'
import green2 from './../images/bl_green.svg'
import C2CLogo from './c2clogo.js'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

class TeamNumber extends Component{
    state={
        n:''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    go=()=>{
        if(this.state.n){
            localStorage.setItem('c2c_judge_teamno',this.state.n)
            window.location.href="/team_eval"
        }
    }

    logout=()=>{
        localStorage.clear()
        window.location.href="/login"
    }

    render(){
        return(
            <div className="team_number_div center">
                {/* <img className="green1" src={green1} />
                <img className="green2" src={green2} /> */}

                <C2CLogo />

                <Typography component="p" className="enter_tnum">Enter Team Number</Typography>

                <input type="text" className="num_inp" id="num" onChange={this.handleChange('n')} autoFocus/>
                <br></br>
                <Button onClick={this.go} className="team_number_submit">SUBMIT</Button>

                <Typography component="p" className="welcome_name">Welcome <span className="bold">{localStorage.getItem('c2c_judge_name')}</span></Typography>
                <Typography component="p" onClick={this.logout} className="logout_link">Logout</Typography>

            </div>
        )
    }
}

export default TeamNumber
