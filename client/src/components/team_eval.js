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
        state:'',

        showheads:false,
        showoption1:false,
        showoption2:false,
        showoption3:false,

        open1:false,
        open2:false,
        open3:false,

        tracks:[],
        pbs:[],
        set_track:"",
        set_pbs:"",

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

        anchorEl1:null,
        anchorEl2:null,
        selectedIndex1: 0,
        selectedIndex2: 0
    }

    handleClick1 = event => {
        this.setState({ anchorEl1: event.currentTarget },()=>{
        });
    };

    handleClick2 = event => {
        this.setState({ anchorEl2: event.currentTarget });
    };

    handleMenuItemClick1 = (event, index) => {
        this.setState({ selectedIndex1: index, anchorEl1: null });

        this.setState({
            set_track:this.state.tracks[index]
        },()=>{
            this.setState({
                set_pbs:this.state.pbs[index][0]
            })
        })
    };

    handleMenuItemClick2 = (event, index) => {
        this.setState({ selectedIndex2: index, anchorEl2: null });

        this.setState({
            set_pbs:this.state.pbs[this.state.selectedIndex1][index]
        })
    };
    
    handleClose1 = () => {
        this.setState({ anchorEl1: null });
    };

    handleClose2 = () => {
        this.setState({ anchorEl2: null });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    getContent=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        axios.get('https://salty-citadel-13883.herokuapp.com/tracks').then((res)=>{
            
            let data=res.data.data
            let pbs=[]
            let tracks=[]
            
            data.forEach((val,ind)=>{
                if(!(val.track in tracks)){
                    tracks.push(val.track)
                }
            })
            
            tracks.forEach((val,ind)=>{
                let newt=[]
                data.forEach((value,index)=>{
                    if(value.track==val){
                        newt.push(value.problem)
                    }
                })
                newt.push("Other")
                pbs.push(newt)
            })

            this.setState({
                tracks:tracks,
                pbs:pbs
            })
        })
        axios.get(BASE_URL+'/fetch',{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            },
            params
        }).then((res)=>{
            this.setState({
                team_name:res.data.teamId,
                team_members:res.data.names,
                state:res.data.state
            })

            if(this.state.state=="insp1"){
                this.setState({
                    team_track:res.data.track,
                    team_problem_statement:res.data.problemStatement,
                    showheads:true,
                    showoption1:true
                })
            }
            else if(this.state.state=="insp2"){
                this.setState({
                    team_track:res.data.track,
                    team_problem_statement:res.data.problemStatement,
                    showheads:true,
                    showoption1:true,
                    showoption2:true,
                    insp1_remarks:res.data.insp1Remarks,
                    insp1_1:res.data.insp1['sps'],
                    insp1_2:res.data.insp1['ups'],
                    insp1_3:res.data.insp1['as']
                })
            }
            else if(this.state.state=="eval"){
                this.setState({
                    team_track:res.data.track,
                    team_problem_statement:res.data.problemStatement,
                    showheads:true,
                    showoption1:true,
                    showoption2:true,
                    showoption3:true,
                    insp1_remarks:res.data.insp1Remarks,
                    insp1_1:res.data.insp1['sps'],
                    insp1_2:res.data.insp1['ups'],
                    insp1_3:res.data.insp1['as'],
                    insp2_remarks:res.data.insp2Remarks,
                    insp2_1:res.data.insp2['imp'],
                    insp2_2:res.data.insp2['pc']
                })
            }
            else if(this.state.state=="done"){
                this.setState({
                    team_track:res.data.track,
                    team_problem_statement:res.data.problemStatement,
                    showheads:true,
                    showoption1:true,
                    showoption2:true,
                    showoption3:true,
                    insp1_remarks:res.data.insp1Remarks,
                    insp1_1:res.data.insp1['sps'],
                    insp1_2:res.data.insp1['ups'],
                    insp1_3:res.data.insp1['as'],
                    insp2_remarks:res.data.insp2Remarks,
                    insp2_1:res.data.insp2['imp'],
                    insp2_2:res.data.insp2['pc'],
                    insp3_remarks:res.data.insp3Remarks,
                    insp3_1:res.data.insp3['simp'],
                    insp3_2:res.data.insp3['des'],
                    insp3_3:res.data.insp3['srtp'],
                    insp3_4:res.data.insp3['tech'],
                    insp3_5:res.data.insp3['crp']
                })
            }
        })
    }

    dopsselection=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        params.append('track',this.state.set_track)
        if(this.state.set_pbs!=="Other"){
            params.append('ps',this.state.set_pbs)
        }
        else{
            params.append('ps',this.state.team_own_ps)
        }


        axios.post(BASE_URL+'/postps',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            window.location.reload()
        })
    }

    doinspection1=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        params.append('sps',this.state.insp1_1)
        params.append('ups',this.state.insp1_2)
        params.append('as',this.state.insp1_3)
        params.append('remarks',this.state.insp1_remarks)

        axios.post(BASE_URL+'/postinsp1',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            window.location.reload()
        })
    }

    doinspection2=()=>{
        let params=new URLSearchParams()
        params.append('teamCode',localStorage.getItem('c2c_judge_teamno'))
        params.append('imp',this.state.insp2_1)
        params.append('pc',this.state.insp2_2)
        params.append('remarks',this.state.insp2_remarks)

        axios.post(BASE_URL+'/postinsp2',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            window.location.reload()
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

        axios.post(BASE_URL+'/posteval',params,{
            headers:{
                'Authorization':localStorage.getItem('c2c_judge_auth')
            }
        }).then((res)=>{
            window.location.reload()
        })
    }

    deleteGoBack=()=>{
        localStorage.removeItem('c2c_judge_teamno')
        window.location.href="/team_number"
    }

    render(){
        const { anchorEl1,anchorEl2 } = this.state;
        return(
            <div className="team_eval_div margindown_50">
                {/* <img className="green1" src={green1} />
                <img className="green2" src={green2} /> */}

                <C2CLogo />
                {this.state.tracks && <Menu
                id="simple-menu"
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                onClose={this.handleClose1}
                >
                    {this.state.tracks && this.state.tracks.map((option, index) => (
                    <MenuItem
                    key={option}
                    selected={index === this.state.selectedIndex1}
                    onClick={event => this.handleMenuItemClick1(event, index)}
                    >
                        {option}
                    </MenuItem>
                    ))}
                </Menu>}
                {this.state.pbs && <Menu
                id="simple-menu"
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={this.handleClose2}
                >
                    {this.state.pbs[this.state.selectedIndex1] && this.state.pbs[this.state.selectedIndex1].map((option, index) => (
                    <MenuItem
                    key={option}
                    selected={index === this.state.selectedIndex2}
                    onClick={event => this.handleMenuItemClick2(event, index)}
                    >
                        {option}
                    </MenuItem>
                    ))}
                </Menu>}
                <Typography component="p" onClick={this.deleteGoBack} className="go_back white pointer little_up little_big little_down"><KeyboardArrowLeft className="center-vert"/><span className="center-vert">Go Back</span></Typography>
                <div className="team_details">
                    <Typography component="p" className="team_name big green bold">{this.state.team_name}</Typography>
                    {
                        this.state.team_members && this.state.team_members.map((val,ind)=>(
                            <Typography component="p" className="team_member_name same_line white little_big">{val}</Typography>
                        ))
                    }
                    <Typography component="p" className="big green little_up bold">Track</Typography>
                    {this.state.team_track && <Typography component="p" className="big white">{this.state.team_track}</Typography>}
                    {!this.state.team_track && <Button className="tracks_dropdown_btn" aria-owns={anchorEl1 ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick1}>Select Track</Button>}
                    {this.state.set_track && <Typography className="big white">{this.state.set_track}</Typography>}
                    <Typography component="p" className="big green little_up bold">Problem Statement</Typography>
                    {this.state.team_problem_statement && <Typography component="p" className="little_big white">{this.state.team_problem_statement}</Typography>}
                    {!this.state.team_problem_statement && <Button className="pbs_dropdown_btn" aria-owns={anchorEl2 ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick2}>Select Problem Statement</Button>}<br></br>
                    {this.state.set_pbs && <Typography className="big white">{this.state.set_pbs}</Typography>}<br></br>
                    {this.state.set_pbs=="Other" && <textarea rows="5" cols="150" onChange={this.handleChange('team_own_ps')} className="message_ps_box" value={this.state.team_own_ps}></textarea>}
                    {!this.state.team_problem_statement && <Button onClick={this.dopsselection} className="ps_submit_btn">Submit</Button>}
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
                        <input type="text" onChange={this.handleChange('insp1_1')} className="score_inp same_line center-vert" id="score1" value={this.state.insp1_1} />
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
                        {this.state.showoption2 && <Typography component="p" onClick={()=>{ this.setState({ open2:!this.state.open2 }) }} className="big white right same_line pointer">Close</Typography>}
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
                        <textarea rows="10" cols="150" onChange={this.handleChange('insp2_remarks')} className="message_box" value={this.state.insp2_remarks}></textarea>

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
