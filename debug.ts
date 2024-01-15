import config from './config.json';
import DroneMobile from './src';
import inquirer from 'inquirer';

const { username, password } = config;

let client: DroneMobile;
let vehicleId;

const apiCalls = {
  exit: { run: () => true },
  status: {
    run: async () => {
      const status = await client.status(vehicleId);
      console.log('status', JSON.stringify(status, null, 2));
    },
  },
  start: {
    run: async () => {
      const start = await client.start(vehicleId);
      console.log('start', JSON.stringify(start, null, 2));
    },
  },
  stop: {
    run: async () => {
      const stop = await client.stop(vehicleId);
      console.log('stop', JSON.stringify(stop, null, 2));
    },
  },
  lock: {
    run: async () => {
      const lock = await client.lock(vehicleId);
      console.log('lock', JSON.stringify(lock, null, 2));
    },
  },
  unlock: {
    run: async () => {
      const unlock = await client.unlock(vehicleId);
      console.log('unlock', JSON.stringify(unlock, null, 2));
    },
  },
  trunk: {
    run: async () => {
      const trunk = await client.trunk(vehicleId);
      console.log('trunk', JSON.stringify(trunk, null, 2));
    },
  },
  aux1: {
    run: async () => {
      const aux1 = await client.aux1(vehicleId);
      console.log('aux1', JSON.stringify(aux1, null, 2));
    },
  },
  aux2: {
    run: async () => {
      const aux2 = await client.aux2(vehicleId);
      console.log('aux2', JSON.stringify(aux2, null, 2));
    },
  },
  location: {
    run: async () => {
      const location = await client.location(vehicleId);
      console.log('location:', JSON.stringify(location, null, 2));
    },
  },
};

const onReadyHandler = async () => {
  // get a list of vehicles on the account
  const vehicleList = await client.vehicles();
  vehicleId = vehicleList[0]?.device_key;
  askForCommandInput();
};

const createInstance = () => {
  client = new DroneMobile({
    username,
    password,
  });
  client.on('ready', onReadyHandler);
};

function askForCommandInput() {
  console.log('');
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'command',
        message: 'What you wanna do?',
        choices: Object.entries(apiCalls).map(([k, v]) => k),
      },
    ])
    .then(answers => {
      if (answers.command === 'exit') {
        return;
      }

      apiCalls[answers.command].run();
    });
}

createInstance();
