## Description

Provide basic implmentation(GET, PUT and DELETE) of IMS home phone subscriber service

## Assumptions
- Subscriber resource requires all the fields to be filled out. This allows validation to be a bit easier.
- The subscriber resource example shape will never change. This allows me to create the shape of the object in mongo and use `strict: true` 
- phoneNumber is a number but is saved in the db as a string. I added validation to ensure the string is only numbers. Ideally add a phone number specific validator or regex
- Internal api usage, if this was external I would need to add more security feature such as auth.

## Prequisite
- MongoDB is setup locally
- Create `.env.yaml` file and provide all the information required as seen in `.env.sample.yaml`
- Postman to make request to `localhost:3000/ims/subscriber/:phoneNumber`

## Installation

```bash
$ npm install
$ npm run build
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```