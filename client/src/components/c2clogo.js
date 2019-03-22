import React,{Component} from 'react'
import logo from './../images/logo1.png'
import text from './../images/c2c_text.svg'
import Typography from '@material-ui/core/Typography'

class C2CLogo extends Component{
    render(){
        return(
            <div className="c2c_logo">
                <img className="c2clogo_logo same_line center-vert" src={logo} />
                <Typography component="p" className="c2clogo_text same_line center-vert" >Code2Create</Typography>
            </div>
        )
    }
}

export default C2CLogo