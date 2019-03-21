package models

type Teams struct {
	names      []string
	uniqueCode int
	insp1      map[string]int
	insp2      map[string]int
	eval       []map[string]int
}
