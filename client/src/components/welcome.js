import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import './../images/tr_green.svg'
import green1 from './../images/tr_green.svg'
import green2 from './../images/bl_green.svg'
import C2CLogo from './c2clogo.js'
import Button from '@material-ui/core/Button'

class Welcome extends Component{
    render(){
        return(
            <div className="welcome_div center">
                {/* <img className="green1" src={green1} />
                <img className="green2" src={green2} /> */}

                <C2CLogo />
                <Button onClick={()=>{ window.location.href="/login" }} className="login_btn">LOGIN</Button>
            </div>
        )
    }
}

export default Welcome
