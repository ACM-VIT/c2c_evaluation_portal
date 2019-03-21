package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/ACM-VIT/c2c_evaluation_portal/config"
	"github.com/globalsign/mgo"
)

func main() {

	config.Env()
	_, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		fmt.Println("Error connecting to mongodb")
	}
	http.ListenAndServe(os.Getenv("ADDR"), nil)

}
