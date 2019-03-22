import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import './../images/tr_green.svg'
import C2CLogo from './c2clogo.js'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import axios from 'axios';
import url from './url.js'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

let BASE_URL=url.initial

class TeamEval extends Component{
    constructor(props){
        super(props)
        this.getContent()
    }

    state={
        showheads:false,
        showoption1:false,
        showoption2:false,
        showoption3:false,

        open1:false,
        open2:false,
        open3:false,

        tracks:[],
        problem_statements:[],

        team_track:"",
        team_problem_statement:"",
        team_own_ps:"",
        team_name:"",
        team_members:[],

        insp1_1:0,
        insp1_2:0,
        insp1_3:0,
        insp1_remarks:'',

        insp2_1:0,
        insp2_2:0,
        insp2_remarks:'',

        insp3_1:0,
        insp3_2:0,
        insp3_3:0,
        insp3_4:0,
        insp3_5:0,
        insp3_remarks:'',

        inspection2:{},

        evaluation_panel:{},

        anchorEl:null
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    getContent=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        axios.get(BASE_URL+'/fetch',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            console.log(res.data)
        })

        // this.setState({
        //     team_name:res.data.name,
        //     team_members:res.data.members
        // })
        // if(state=="ps"){
        //     // this.loadproblemstatements()
        // }
        // else if(state=="insp1"){
        //     // this.setState({
        //     //     team_track:res.data.track,
        //     //     team_problem_statement:res.data.problem_statement
        //     // })
        //     // this.doinspection1()
        // }
        // else if(state=="insp2"){
        //     // this.doinspection2()
        // }
        // else if(state=="insp3"){
        //     // this.doinspection3()
        // }
    }

    loadproblemstatements=()=>{
        axios.get('').then((res)=>{
            this.setState({
                tracks:'',
                problem_statements:''
            })
        })
    }

    dopsselection=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        params.append('track',this.state.team_track)
        params.append('ps',this.state.team_problem_statement)

        axios.post(BASE_URL+'/postps',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            console.log(res.data)
        })
    }

    doinspection1=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        params.append('sps',this.state.insp1_1)
        params.append('ups',this.state.insp1_2)
        params.append('as',this.state.insp1_3)
        params.append('remarks',this.state.insp1_remarks)

        console.log(params)

        axios.post(BASE_URL+'/postinsp1',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            console.log(res.data)
        })
    }

    doinspection2=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        params.append('imp',this.state.insp2_1)
        params.append('pc',this.state.insp2_2)
        params.append('remarks',this.state.insp2_remarks)

        console.log(params)

        axios.post(BASE_URL+'/postinsp2',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            console.log(res.data)
        })
    }

    doinspection3=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        params.append('simp',this.state.insp3_1)
        params.append('des',this.state.insp3_2)
        params.append('srtp',this.state.insp3_3)
        params.append('tech',this.state.insp3_4)
        params.append('crp',this.state.insp3_5)
        params.append('remarks',this.state.insp3_remarks)

        console.log(params)

        axios.post(BASE_URL+'/postinsp3',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            console.log(res.data)
        })
    }

    deleteGoBack=()=>{
        localStorage.removeItem('c2c_judge_teamno')
        window.location.href="/team_number"
    }

    render(){
        const { anchorEl } = this.state;
        let team_members=['shivank','aditya','akshit']
        return(
            <div className="team_eval_div margindown_50">
                {/* <img className="green1" src={green1} />
                <img className="green2" src={green2} /> */}

                <C2CLogo />
                <Typography component="p" onClick={this.deleteGoBack} className="go_back white pointer little_up little_big little_down"><KeyboardArrowLeft className="center-vert"/><span className="center-vert">Go Back</span></Typography>
                <div className="team_details">
                    <Typography component="p" className="team_name big green bold">{this.state.team_name}</Typography>
                    {
                        team_members.map((val,ind)=>(
                            <Typography component="p" className="team_member_name same_line white little_big">{val}</Typography>
                        ))
                    }
                    <Typography component="p" className="big green little_up bold">Track</Typography>
                    {this.state.team_track && <Typography component="p" className="big white">{this.state.team_track}</Typography>}
                    <Typography component="p" className="big green little_up bold">Problem Statement</Typography>
                    {this.state.team_problem_statement && <Typography component="p" className="little_big white">{this.state.team_problem_statement}</Typography>}
                    {this.state.team_problem_statement=="Other" && <textarea rows="5" cols="150" onChange={this.handleChange('team_own_ps')} className="message_ps_box" value={this.state.team_own_ps}></textarea>}
                    <Button onClick={this.dopsselection} className="ps_submit_btn">Submit</Button>
                </div>

                {this.state.showheads && !this.state.open1 && <div className="tech_inspect_1">
                    <div className="opener1">
                        <Typography component="p" className="big white bold same_line">Technical Inspection 1</Typography>
                        {this.state.showoption1 && <Typography component="p" onClick={()=>{ this.setState({ open1:!this.state.open1 }) }} className="big green right same_line pointer">View</Typography>}
                    </div>
                </div>}

                {this.state.open1 && <div className="tech_inspect_1 back_green">
                    <div className="opener1_green">
                        <Typography component="p" className="big white bold same_line">Technical Inspection 1</Typography>
                        {this.state.showoption1 && <Typography component="p" onClick={()=>{ this.setState({ open1:!this.state.open1 }) }} className="big white right same_line pointer">Close</Typography>}
                    </div>
                </div>}
                    {this.state.open1 && <div className="scores1">
                        <div className="">
                        <Typography component="p" className="big white bold same_line center-vert">Significance of problem statement</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp1_1')} className="score_inp same_line center-vert" id="score1" value={this.state.insp1_2} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>
                        
                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Understanding of problem statement</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp1_2')} className="score_inp same_line center-vert" id="score2" value={this.state.insp1_2} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>

                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Approach for a solution</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp1_3')} className="score_inp same_line center-vert" id="score3" value={this.state.insp1_3} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>

                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Total</Typography>
                        <div className="same_line center-vert little_left">
                        <Typography component="p" className="big green bold same_line center-vert">{Number(this.state.insp1_1)+Number(this.state.insp1_2)+Number(this.state.insp1_3)}</Typography>
                        <Typography component="p" className="green same_line center-vert big">/30</Typography>
                        </div>
                        </div>

                        <Typography component="p" className="big white bold margintop_30">Remarks</Typography>
                        <textarea rows="10" cols="150" onChange={this.handleChange('insp1_remarks')} className="message_box" value={this.state.insp1_remarks}></textarea>

                        <Button onClick={this.doinspection1} className="ps_submit_btn">Submit</Button>
                    </div>}
                

                    {this.state.showheads && !this.state.open2 && <div className="tech_inspect_2">
                    <div className="opener2">
                        <Typography component="p" className="big white bold same_line">Technical Inspection 2</Typography>
                        {this.state.showoption2 && <Typography component="p" onClick={()=>{ this.setState({ open2:!this.state.open2 }) }} className="big green right same_line pointer">View</Typography>}
                    </div>
                </div>}

                {this.state.open2 && <div className="tech_inspect_2 back_green">
                    <div className="opener2_green">
                        <Typography component="p" className="big white bold same_line">Technical Inspection 2</Typography>
                        {this.state.showpotion2 && <Typography component="p" onClick={()=>{ this.setState({ open2:!this.state.open2 }) }} className="big white right same_line pointer">Close</Typography>}
                    </div>
                </div>}
                    {this.state.open2 && <div className="scores2">
                        <div className="">
                        <Typography component="p" className="big white bold same_line center-vert">Implementation</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp2_1')} className="score_inp same_line center-vert" id="score1" value={this.state.insp2_1} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>
                        
                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Percentage Completion</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp2_2')} className="score_inp same_line center-vert" id="score2" value={this.state.insp2_2} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>

                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Total</Typography>
                        <div className="same_line center-vert little_left">
                        <Typography component="p" className="big green bold same_line center-vert">{Number(this.state.insp2_1)+Number(this.state.insp2_2)}</Typography>
                        <Typography component="p" className="green same_line center-vert big">/20</Typography>
                        </div>
                        </div>

                        <Typography component="p" className="big white bold margintop_30">Remarks</Typography>
                        <textarea rows="10" cols="150" onChange={this.handleChange('insp2_remarks')} className="message_box" val={this.state.insp2_remarks} ></textarea>

                        <Button onClick={this.doinspection2} className="ps_submit_btn">Submit</Button>
                    </div>}

                    {this.state.showheads && !this.state.open3 && <div className="tech_inspect_3">
                    <div className="opener3">
                        <Typography component="p" className="big white bold same_line">Evaluation Panel</Typography>
                        {this.state.showoption3 && <Typography component="p" onClick={()=>{ this.setState({ open3:!this.state.open3 }) }} className="big green right same_line pointer">View</Typography>}
                    </div>
                </div>}

                {this.state.open3 && <div className="tech_inspect_3 back_green">
                    <div className="opener3_green">
                        <Typography component="p" className="big white bold same_line">Evaluation Panel</Typography>
                        {this.state.showoption3 && <Typography component="p" onClick={()=>{ this.setState({ open3:!this.state.open3 }) }} className="big white right same_line pointer">Close</Typography>}
                    </div>
                </div>}
                    {this.state.open3 && <div className="scores3">
                        <div className="">
                        <Typography component="p" className="big white bold same_line center-vert">Simplicity</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp3_1')} className="score_inp same_line center-vert" id="score1" val={this.state.insp3_1} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>
                        
                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Design</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp3_2')} className="score_inp same_line center-vert" id="score1" val={this.state.insp3_2} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>

                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Solves a real time problem</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp3_3')} className="score_inp same_line center-vert" id="score1" val={this.state.insp3_3} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>

                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Technology</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp3_4')} className="score_inp same_line center-vert" id="score1" val={this.state.insp3_4} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>

                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Could it be a real product?</Typography>
                        <div className="same_line center-vert">
                        <input type="text" onChange={this.handleChange('insp3_5')} className="score_inp same_line center-vert" id="score1" val={this.state.insp3_5} />
                        <Typography component="p" className="green same_line center-vert big">/10</Typography>
                        </div>
                        </div>

                        <div className="margintop_30">
                        <Typography component="p" className="big white bold same_line center-vert">Total</Typography>
                        <div className="same_line center-vert little_left">
                        <Typography component="p" className="big green bold same_line center-vert">{Number(this.state.insp3_1)+Number(this.state.insp3_2)+Number(this.state.insp3_3)+Number(this.state.insp3_4)+Number(this.state.insp3_5)}</Typography>
                        <Typography component="p" className="green same_line center-vert big">/50</Typography>
                        </div>
                        </div>

                        <Typography component="p" className="big white bold margintop_30">Remarks</Typography>
                        <textarea rows="10" cols="150" onChange={this.handleChange('insp3_remarks')} className="message_box" value={this.state.insp3_remarks}></textarea>

                        <Button onClick={this.doinspection3} className="ps_submit_btn">Submit</Button>
                    </div>}

            </div>
        )
    }
}

export default TeamEval
