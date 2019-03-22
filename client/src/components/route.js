import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Welcome from './welcome.js'
import Login from './login.js'
import TeamNumber from './team_number.js'
import TeamEval from './team_eval.js'

class Router extends Component{
    render(){
        return(
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="routes">
                    {!localStorage.getItem('c2c_judge_auth') &&
                        <Switch>
                        <Route path="/" exact component={Welcome} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/team_number" exact component={TeamNumber} />
                        <Route path="/team_eval" exact component={TeamEval} />
                        </Switch>
                    }
                    {localStorage.getItem('c2c_judge_auth') &&
                        <Switch>
                        <Route path="/" exact component={Welcome} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/team_number" exact component={TeamNumber} />
                        <Route path="/team_eval" exact component={TeamEval} />
                        </Switch>
                    }
                </div>
            </BrowserRouter>
        )
    }
}

export default Router