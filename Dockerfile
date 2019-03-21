FROM golang:1.11-alpine3.9 as builder

WORKDIR /go/src/

RUN apk update && \
apk add git && \ 
go get github.com/dgrijalva/jwt-go && \
go get github.com/globalsign/mgo

WORKDIR /go/src/github.com/ACM-VIT/c2c_evaluation_portal

COPY . /go/src/github.com/ACM-VIT/c2c_evaluation_portal

RUN go build main.go

FROM alpine:3.9

WORKDIR /app

COPY --from=builder /go/src/github.com/ACM-VIT/c2c_evaluation_portal .

CMD ["./main"]
