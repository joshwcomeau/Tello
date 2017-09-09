const fs = require('fs');

const nconf = require('nconf');


if ( typeof process.env.NODE_ENV === 'undefined' ) {
  process.env.NODE_ENV = 'development'
}

const DEFAULT_CONFIG  = './server/config/defaults.json';
const PRIVATE_CONFIG  = './server/config/private.json';

// The whole config thing is a little confusing when it comes to deployment.
// Locally, we'll run `development.json`. We also have a `private.json`,
// for stuff we don't want to store in Git.
//
// In production, we don't need both a `production.json` and a `private.json`,
// because the server's `production.json` IS private.
//
// That said, nconf doesn't seem to complain about missing files,
// so the PRIVATE_CONFIG line just won't do anything in production.

let ENV_CONFIG = process.env.NODE_ENV === 'production'
  ? '/home/deploy/config/tello/production.json'
  : `./server/config/${process.env.NODE_ENV}.json`;

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. Our private config (eg. secret keys)
//   4. Our environment-specific config (eg. database info)
//   5. Our default configuration (eg. timezone)

nconf
  .argv()
  .env()
  .file('private', PRIVATE_CONFIG)
  .file('environment', ENV_CONFIG)
  .file('defaults', DEFAULT_CONFIG);
