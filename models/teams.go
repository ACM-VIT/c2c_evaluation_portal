package models

type Teams struct {
	TeamId           string                    `bson:"teamId"`
	Names            []string                  `bson:"names"`
	Track            string                    `bson:"track"`
	ProblemStatement string                    `bson:"problemStatement"`
	UniqueCode       string                    `bson:"uniqueCode"`
	Insp1            map[string]int            `bson:"insp1"`
	Insp1Remarks     string                    `bson:"insp1Remarks"`
	Insp2            map[string]int            `bson:"insp2"`
	Insp2Remarks     string                    `bson:"insp2Remarks"`
	Eval             map[string]map[string]int `bson:"eval"`
	EvalRemarks      map[string]string         `bson:"evalRemarks"`
	Eliminated       bool                      `bson:"eliminated"`
}
