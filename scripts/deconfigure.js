#!/usr/bin/env node
'use strict'

const modifyFiles = require('./utils').modifyFiles
const packageJson = require('../package.json')
const config = packageJson.config

modifyFiles(
  ['./proxy-api.yaml', './package.json', './template.yaml'],
  [
    {
      regexp: new RegExp(config.accountId, 'g'),
      replacement: 'YOUR_ACCOUNT_ID',
    },
    {
      regexp: new RegExp(config.region, 'g'),
      replacement: 'YOUR_AWS_REGION',
    },
    {
      regexp: new RegExp(config.cloudFormationStackName, 'g'),
      replacement: 'YOUR_CLOUD_FORMATION_STACK_NAME',
    },
    {
      regexp: new RegExp(config.functionName, 'g'),
      replacement: 'YOUR_SERVERLESS_EXPRESS_LAMBDA_FUNCTION_NAME',
    },
    {
      regexp: new RegExp(config.profile, 'g'),
      replacement: 'YOUR_PROFILE',
    },
  ],
)
