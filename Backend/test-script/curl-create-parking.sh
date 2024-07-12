#!/bin/bash

myHeaders="Content-Type: application/json"

parkingName=(
  "Park A01"
  "Park A02"
  "Park A03"
  "Park A04"
  "Park A05"
  "Park A06"
  "Park A07"
  "Park A08"
  "Park A09"
)

for name in "${parkingName[@]}"; do
  curl -X POST http://localhost:3000/parking/ \
    -H "$myHeaders" \
    -d '{
      "name": "'"${name}"'",
      "location": {
        "buildingId": "668ec9921567b18c176488fe",
        "floorId": "668ec9e6df58a2185c2ef73f",
        "zoneId": "668ec9f5df58a2185c2ef742"
      },
      "status": "Available",
      "packageId": "668f8ff6bf8a587bb1f33d04",
      "exitNumber": "01"
    }'
done
