#!/bin/bash

npm test

if [ $? -eq 0 ]
then
  zip index.zip index.js
  aws lambda update-function-code --function-name useragentparser --zip-file fileb://index.zip
  rm index.zip
fi