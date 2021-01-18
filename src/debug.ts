/* eslint-disable */
import config from '../config.json';
import DroneMobile from './';

const client = new DroneMobile(config);

client.on('ready', async () => {
  const vehicleList = await client.vehicles();
  const vehicle: any = vehicleList[0];

  console.log('Attempting to lock car', vehicle.device_key);

  try {
    const response = await client.lock(vehicle.device_key);
    console.log(response);
  } catch (err) {
    console.log('Err:', err);
  }

});
