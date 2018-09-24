# Testing http requests locally through browser

> Used to test locally requests

## Installation

#### Install 

```
npm install
```

#### Run locally (localhost:8081)

```
npm run dev
```

#### Generate prod build under docs

```
npm run prod
```

#### Analyze build

```
npm run analyze
```

#### Generate desktop app

```
npm run generate-desktop
```

## Requests options

- Methods
    + GET
    + POST
    + PUT
    + DELETE
- Base url
- Url
- Headers (json object)
- Body (json object)

## Notes

- Uses axios internally [docs](https://github.com/axios/axios)

## TODO

- add left side menu
- add persist functionality (history, saved requests, autocomplete)
- add tests