package models

type User struct {
	Name       string `bson:"name"`
	Username   string `bson:"username"`
	Password   string `bson:"password"`
	UniqueCode string `bson:"uniqueCode"`
}
