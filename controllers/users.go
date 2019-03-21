package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/ACM-VIT/c2c_evaluation_portal/models"
	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

type LoginResponse struct {
	Code string `json:"code"`
	Name string `json:"name"`
}

func Login(db *mgo.Database) func(http.ResponseWriter, *http.Request) {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		if req.Method != "POST" {
			res.WriteHeader(405)
			res.Write([]byte("{\"message\":\"Method not allowed\"}"))
			return
		}
		err := req.ParseForm()
		if err != nil {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Invalid form data\"}"))
			return
		}
		var users []models.User
		username := req.PostFormValue("username")
		password := req.PostFormValue("password")
		db.C("users").Find(bson.M{
			"username": username,
			"password": password,
		}).All(&users)
		if len(users) == 0 {
			res.WriteHeader(401)
			res.Write([]byte("{\"message\":\"Invalid username/password\"}"))
			return
		} else {
			response, err := json.Marshal(LoginResponse{Code: users[0].UniqueCode, Name: users[0].Name})
			if err != nil {
				res.WriteHeader(500)
				res.Write([]byte("{\"message\":\"Internal Server Error\"}"))
				return
			}
			res.WriteHeader(200)
			res.Write(response)
			return
		}
	}
}

func FetchTeam(db *mgo.Database) func(http.ResponseWriter, *http.Request) {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		if req.Method != "GET" {
			res.WriteHeader(405)
			res.Write([]byte("{\"message\":\"Method not allowed\"}"))
			return
		}
		teamCode := req.FormValue("teamCode")
		judgeCode := req.FormValue("judgeCode")
		if judgeCode == "" {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Judge code is required\"}"))
			return
		}
		if teamCode == "" {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Team code is required\"}"))
			return
		}
		var teams []models.Teams
		db.C("teams").Find(bson.M{"uniqueCode": teamCode}).All(&teams)
		if len(teams) == 0 {
			res.WriteHeader(404)
			res.Write([]byte("{\"message\":\"Team not found\"}"))
			return
		}
		team := teams[0]
		fmt.Println(team)
		if team.Eliminated {
			res.WriteHeader(409)
			res.Write([]byte("{\"message\":\"Team is eliminated\"}"))
			return
		}
		response := map[string]interface{}{}
		response["teamId"] = team.TeamId
		response["names"] = team.Names
		if team.Track == "" {
			response["state"] = "ps"
			sendJson(res, response)
			return
		}
		response["problemStatement"] = team.ProblemStatement
		response["track"] = team.Track
		if team.Insp1 == nil {
			response["state"] = "insp1"
			sendJson(res, response)
			return
		}
		response["insp1"] = team.Insp1
		response["insp1Remarks"] = team.Insp1Remarks
		if team.Insp2 == nil {
			response["state"] = "insp2"
			sendJson(res, response)
			return
		}
		response["insp2"] = team.Insp2
		response["insp2Remarks"] = team.Insp2Remarks
		if team.Eval == nil {
			response["state"] = "eval"
			sendJson(res, response)
			return
		}
		response["state"] = "done"
		response["eval"] = team.Eval[judgeCode]
		response["evalRemarks"] = team.EvalRemarks[judgeCode]
		sendJson(res, response)
		return
	}
}

func PostProblemStatement(db *mgo.Database) func(res http.ResponseWriter,
	req *http.Request,
) {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		if req.Method != "POST" {
			res.WriteHeader(405)
			res.Write([]byte("{\"message\":\"Method not allowed\"}"))
			return
		}
		err := req.ParseForm()
		if err != nil {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Invalid form data\"}"))
			return
		}
		teamCode := req.PostFormValue("teamCode")
		track := req.PostFormValue("track")
		ps := req.PostFormValue("problemStatement")
		if teamCode == "" || track == "" || ps == "" {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Incomplete form data\"}"))
			return
		}
		ci, err := db.C("teams").UpdateAll(bson.M{
			"uniqueCode": teamCode,
		}, bson.M{
			"$set": bson.M{"track": track, "problemStatement": ps},
		})
		if err != nil {
			res.WriteHeader(500)
			res.Write([]byte("{\"message\":\"Internal Server Error\"}"))
			return
		}
		if ci.Matched == 0 {
			res.WriteHeader(200)
			res.Write([]byte("{\"message\":\"Team not found\"}"))
			return
		}
		res.WriteHeader(200)
		res.Write([]byte("{\"message\":\"Updated successfully\"}"))
		return
	}
}

func PostInsp1(db *mgo.Database) func(http.ResponseWriter, *http.Request) {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		if req.Method != "POST" {
			res.WriteHeader(405)
			res.Write([]byte("{\"message\":\"Method not allowed\"}"))
			return
		}
		err := req.ParseForm()
		if err != nil {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Invalid form data\"}"))
			return
		}
		teamCode := req.PostFormValue("teamCode")
		sps := req.PostFormValue("sps")
		ups := req.PostFormValue("ups")
		as := req.PostFormValue("as")
		remarks := req.PostFormValue("remarks")
		if teamCode == "" || sps == "" || ups == "" || as == "" || remarks == "" {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Incomplete form data\"}"))
			return
		}
		data := map[string]int{}
		data["ups"], _ = strconv.Atoi(ups)
		data["sps"], _ = strconv.Atoi(sps)
		data["as"], _ = strconv.Atoi(as)
		ci, err := db.C("teams").UpdateAll(bson.M{
			"uniqueCode": teamCode,
		}, bson.M{
			"$set": bson.M{
				"insp1":        data,
				"insp1Remarks": remarks,
			},
		})
		if err != nil {
			res.WriteHeader(500)
			res.Write([]byte("{\"message\":\"Internal Server Error\"}"))
			return
		}
		if ci.Matched == 0 {
			res.WriteHeader(200)
			res.Write([]byte("{\"message\":\"Team not found\"}"))
			return
		}
		res.WriteHeader(200)
		res.Write([]byte("{\"message\":\"Updated successfully\"}"))
		return
	}
}

func PostInsp2(db *mgo.Database) func(http.ResponseWriter, *http.Request) {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		if req.Method != "POST" {
			res.WriteHeader(405)
			res.Write([]byte("{\"message\":\"Method not allowed\"}"))
			return
		}
		err := req.ParseForm()
		if err != nil {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Invalid form data\"}"))
			return
		}
		teamCode := req.PostFormValue("teamCode")
		imp := req.PostFormValue("imp")
		pc := req.PostFormValue("pc")
		remarks := req.PostFormValue("remarks")
		if teamCode == "" || imp == "" || pc == "" || remarks == "" {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Incomplete form data\"}"))
			return
		}
		data := map[string]int{}
		data["imp"], _ = strconv.Atoi(imp)
		data["pc"], _ = strconv.Atoi(pc)
		ci, err := db.C("teams").UpdateAll(bson.M{
			"uniqueCode": teamCode,
		}, bson.M{
			"$set": bson.M{
				"insp2":        data,
				"insp2Remarks": remarks,
			},
		})
		if err != nil {
			res.WriteHeader(500)
			res.Write([]byte("{\"message\":\"Internal Server Error\"}"))
			return
		}
		if ci.Matched == 0 {
			res.WriteHeader(200)
			res.Write([]byte("{\"message\":\"Team not found\"}"))
			return
		}
		res.WriteHeader(200)
		res.Write([]byte("{\"message\":\"Updated successfully\"}"))
		return
	}
}

func PostEval(db *mgo.Database) func(http.ResponseWriter, *http.Request) {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		if req.Method != "POST" {
			res.WriteHeader(405)
			res.Write([]byte("{\"message\":\"Method not allowed\"}"))
			return
		}
		err := req.ParseForm()
		if err != nil {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Invalid form data\"}"))
			return
		}
		teamCode := req.PostFormValue("teamCode")
		judgeCode := req.PostFormValue("judgeCode")
		simp := req.PostFormValue("simp")
		des := req.PostFormValue("des")
		srtp := req.PostFormValue("srtp")
		tech := req.PostFormValue("tech")
		crp := req.PostFormValue("crp")
		remarks := req.PostFormValue("remarks")
		if teamCode == "" || judgeCode == "" || des == "" || srtp == "" ||
			tech == "" || crp == "" || remarks == "" {
			res.WriteHeader(400)
			res.Write([]byte("{\"message\":\"Incomplete form data\"}"))
			return
		}
		data := map[string]int{}
		data["simp"], _ = strconv.Atoi(simp)
		data["des"], _ = strconv.Atoi(des)
		data["srtp"], _ = strconv.Atoi(srtp)
		data["tech"], _ = strconv.Atoi(tech)
		data["crp"], _ = strconv.Atoi(crp)
		ci, err := db.C("teams").UpdateAll(bson.M{
			"uniqueCode": teamCode,
		}, bson.M{
			"$set": bson.M{
				"eval." + judgeCode:        data,
				"evalRemarks." + judgeCode: remarks,
			},
		})
		if err != nil {
			res.WriteHeader(500)
			res.Write([]byte("{\"message\":\"Internal Server Error\"}"))
			return
		}
		if ci.Matched == 0 {
			res.WriteHeader(200)
			res.Write([]byte("{\"message\":\"Team not found\"}"))
			return
		}
		res.WriteHeader(200)
		res.Write([]byte("{\"message\":\"Updated successfully\"}"))
		return
	}
}

func sendJson(res http.ResponseWriter, v interface{}) {
	b, err := json.Marshal(v)
	if err != nil {
		res.WriteHeader(500)
		res.Write([]byte("{\"message\":\"Internal Server Error\"}"))
		return
	}
	res.WriteHeader(200)
	res.Write(b)
	return
}
