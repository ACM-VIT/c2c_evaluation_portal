package controllers

import (
	"encoding/json"
	"net/http"

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
		if req.Method != "POST" {
			res.Header().Set("Content-Type", "application/json")
			res.WriteHeader(405)
			res.Write([]byte("{\"message\":\"Method not allowed\"}"))
			return
		}
		err := req.ParseForm()
		if err != nil {
			res.Header().Set("Content-Type", "application/json")
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
			res.Header().Set("Content-Type", "application/json")
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
			res.Write([]byte(response))
			return
		}
	}
}
