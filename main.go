package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/ACM-VIT/c2c_evaluation_portal/config"
	"github.com/ACM-VIT/c2c_evaluation_portal/controllers"
	"github.com/globalsign/mgo"
)

func main() {

	config.Env()
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	db := session.DB("evaluation")
	http.HandleFunc("/login", controllers.Login(db))
	if err != nil {
		fmt.Println("Error connecting to mongodb")
	}
	http.ListenAndServe(os.Getenv("ADDR"), nil)

}
