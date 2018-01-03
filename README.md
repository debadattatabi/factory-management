## API FACTORY MANAGEMENT
Factory Management node api using express, mongoose & mongoDB

### MongoDB

1. Install [mongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
1. Create a local directory `mkdir -p data/db` in `api-demo`
1. Start mongodb from local directory - `mongod --dbpath data/db`

### Quick commands

1. Start application watch mode `npm run dev`
1. Start application `npm start`

### Postman api demo collection

[Endpoint collection link](https://www.getpostman.com/collections/a82ec0d062ee11b1140c)

### Contact API Details

<!-- 1. Get all contacts

```text
curl -X GET -H "Cache-Control: no-cache" "http://localhost:8080/api/contacts"
```

2. Create contact

```text
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
    "name": "name",
    "email": "email@me.com"
}' "http://localhost:8080/api/contact"
```

3. Get contact by Id
```text
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:8080/api/contact/{ID}"
```

4. Update contact by Id
```text
curl -X PUT -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
  "name": "name"
}' "http://localhost:8080/api/contact/{ID}"
```

5. Delete contact by Id
```text
curl -X DELETE -H "Cache-Control: no-cache" -H "http://localhost:8080/api/contacts/{ID}"
``` -->
# factory-management
