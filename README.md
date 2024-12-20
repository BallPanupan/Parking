# Setting of Parking project

```
Using MongoDB:		6.0.16
Using Mongosh:		2.2.10
```

## Setup MongoDB on Docker

```
$ docker run -d --name mongodb6 -p 27017:27017 mongo:6

```

* Create a new database administrator user
    ```
    $ db.createUser({user:'yourUsername',pwd:'yourPassword',roles:['readWrite']})
    $ db.createUser({user:"yourUsername", pwd:"yourPassword",roles:[{role:'userAdminAnyDatabase', db:'admin'}]})

    ```

## .env file
```
MONGODB_URI
SERVER_PORT
```


## DB Diagram
![Parking System](https://raw.githubusercontent.com/BondPanupan/Parking/refs/heads/main/car-parking-diagram.png "Parking Database diagram")
