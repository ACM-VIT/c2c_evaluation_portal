FROM golang:1.11-alpine3.9 as builder

WORKDIR /go/src/app

RUN go get github.com/dgrijalva/jwt-go && \
go get github.com/globalsign/mgo

COPY . /go/src/app

RUN go build main.go

FROM alpine:3.9

WORKDIR /app

COPY --from=builder /go/src/app/main .

CMD ["./main"]
