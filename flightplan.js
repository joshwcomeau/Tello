// Flightplan - Deployment and Server Administration
//
// Acceptable arguments:
//   --skip-build           If I've recently bundled, I can skip the bundling.
//   --fresh-dependencies   Don't copy cached NPM module dependencies.
//
// NOTE: Needs to be run with --fresh-dependencies the very first time.
// Otherwise it'll crash trying to copy non-existing previous dependencies

require('babel-core/register');
require('./server/initialize');

const plan    = require('flightplan');
const _       = require('lodash');
const nconf   = require('nconf');
const moment  = require('moment');

const privateKey        = process.env.HOME + "/.ssh/id_rsa";

const user              = 'deploy';
const appName           = 'tello';
const newDirectoryName  = 'tello_' + moment().format('YYYY-MM-DD_hh[h]mm[m]ss[s]');

const tempDir           = `/tmp/${newDirectoryName}`;
const projectDir        = `/home/${user}/${appName}`;

const newDirectory      = `${projectDir}/${newDirectoryName}`;
const linkedDirectory   = `${projectDir}/current`;

const MAX_SAVED_DEPLOYS = 3;

const restartApplication = remote => {
  // Start/Restart the application
  // First, figure out if the app is already running
  let appDetails = remote.exec(`pm2 show ${appName}`, {failsafe: true});
  let alreadyRunning = !appDetails.stderr;

  if (alreadyRunning) {
    remote.exec(`pm2 delete ${appName}`);
  }

  remote.exec(`pm2 start ${linkedDirectory}/server --name="${appName}"`);
}

plan.target('production', {
  host:       nconf.get('SERVER_HOST'),
  username:   nconf.get('SERVER_USER'),
  privateKey: privateKey,
  agent:      process.env.SSH_AUTH_SOCK,
});

plan.local( 'deploy', local => {
  local.log(`Deployment started! Deploying to ${newDirectoryName}`);

  if ( !plan.runtime.options['skip-build'] ) {
    local.log('Webpacking everything up.');
    local.exec('yarn build');
  } else {
    local.log('Skipping webpack bundle.')
  }

  // Yay working with filesystems. How I miss regex.
  local.log('Copying files to remote')
  const dist      = local.find('public', {silent: true}).stdout.split('\n');
  const common    = local.find('build', {silent: true}).stdout.split('\n');
  const server    = local.find('server', {silent: true}).stdout.split('\n');
  const packjson  = local.find('package.json', {silent: true}).stdout.split('\n');
  const files     = [].concat(dist, common, server, packjson);
  local.transfer(files, `/tmp/${newDirectoryName}`);
});

plan.remote( 'deploy', remote => {
  remote.log('Move folder to web root')
  remote.sudo(`cp -R ${tempDir} ${newDirectory}`, { user });
  remote.rm(`-rf ${tempDir}`); // clean up after ourselves

  if ( !plan.runtime.options['fresh-dependencies'] ) {
    remote.log('Copying dependencies from last deploy');
    remote.exec(`cp -R ${linkedDirectory}/node_modules ${newDirectory}/node_modules`)
  }

  remote.log('Installing dependencies');
  remote.sudo(
    `npm --production --prefix ${newDirectory} install ${newDirectory}`,
    { user }
  );


  remote.log('Creating symlink');
  remote.sudo(`ln -snf ${newDirectory} ${linkedDirectory}`, { user });

  restartApplication(remote);

  remote.log('Removing oldest copies of deploy');
  remote.exec(`cd ${projectDir} && rm -rf \`ls -td ${appName}_* | awk 'NR>${MAX_SAVED_DEPLOYS}'\``);
});

plan.remote('restart', restartApplication);
