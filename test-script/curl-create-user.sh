#!/bin/bash

users=(
  "fake-user-01"
  "fake-user-02"
  "fake-user-03"
  "fake-user-04"
  "fake-user-05"
  "fake-user-06"
  "fake-user-07"
  "fake-user-08"
  "fake-user-09"
)

for user in "${users[@]}"; do
  curl -X POST http://localhost:3000/users/ \
    -H "Content-Type: application/json" \
    -d '{
      "name": "'"${user}"'",
      "carNumber": "ก 888 BKK ",
      "status": "Active"
    }'
done
