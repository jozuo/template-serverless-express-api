#!/usr/bin/env node
'use strict'

const fs = require('fs')
const exec = require('child_process').execSync
const modifyFiles = require('./utils').modifyFiles

let minimistHasBeenInstalled = false

if (!fs.existsSync('./node_modules/minimist')) {
  exec('yarn add -D minimist --silent')
  minimistHasBeenInstalled = true
}

const args = require('minimist')(process.argv.slice(2), {
  string: ['account-id', 'function-name', 'region', 'profile', 'stack-name'],
  default: {
    region: 'us-east-1',
    'function-name': 'AwsServerlessExpressFunction',
    profile: 'default',
  },
})

if (minimistHasBeenInstalled) {
  exec('yarn remove minimist --silent')
}

const accountId = args['account-id']
const functionName = args['function-name']
const region = args.region
const profile = args.profile
const stackName = args['stack-name']

if (!accountId || accountId.length !== 12) {
  console.error('You must supply a 12 digit account id as --account-id="<accountId>"')
  process.exit(1)
}

modifyFiles(
  ['./proxy-api.yaml', './package.json', './template.yaml'],
  [
    {
      regexp: /YOUR_ACCOUNT_ID/g,
      replacement: accountId,
    },
    {
      regexp: /YOUR_AWS_REGION/g,
      replacement: region,
    },
    {
      regexp: /YOUR_CLOUD_FORMATION_STACK_NAME/g,
      replacement: stackName,
    },
    {
      regexp: /YOUR_SERVERLESS_EXPRESS_LAMBDA_FUNCTION_NAME/g,
      replacement: functionName,
    },
    {
      regexp: /YOUR_PROFILE/g,
      replacement: profile,
    },
  ],
)
