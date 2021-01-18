/* eslint-disable */
// used to test the bundle for target node.js envs
const config = require('./config.json');
const DroneMobile = require('./dist/index');

const client = new DroneMobile(config);

client.on('ready', async () => {
  const vehicleList = await client.vehicles();
  const vehicle = vehicleList[0];

  console.log('Attempting to lock car', vehicle.device_key);

  try {
    const response = await client.lock(vehicle.device_key);
    console.log(response);
  } catch (err) {
    console.log('Err:', err);
  }
});
