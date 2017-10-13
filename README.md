# nodejs-lambda-useragentparser

Simple Node.js skeleton AWS Lambda. Including tests and CLI deploy.

Run tests:
```
npm test
```

Deploy function:
```
./deploy.sh
```

Test function with lambda-local:
```
lambda-local -l index.js -e event.json
```