# drone-mobile

An unofficial nodejs API wrapper for DroneMobile

[![CI](https://img.shields.io/github/workflow/status/Hacksore/drone-mobile/npm)](https://github.com/Hacksore/drone-mobile/actions?query=workflow%3Anpm)
[![npm](https://img.shields.io/npm/v/drone-mobile.svg)](https://www.npmjs.com/package/drone-mobile)
[![Discord](https://img.shields.io/discord/652755205041029120)](https://discord.gg/HwnG8sY)


### Install
```shell
npm install drone-mobile
```

### Usage
```js
const DroneMobile = require('drone-mobile');
const client = new DroneMobile({
  username: 'some@dude.com',
  password: 'hunter1'
});

client.on('ready', async () => {
  // get a list of vehicles on the account
  const vehicleList = await client.vehicles();

  // pick the first one
  const vehicle = vehicleList[0];

  // attempt a lock command to the vehicle
  console.log('Attempting to lock car', vehicle.device_key);
  try {
    const response = await client.lock(vehicle.device_key);
    console.log(response);
  } catch (err) {
    console.log('Err:', err);
  }

});

```

### Commands

- [x] Start
- [x] Lock
- [x] Unlock
- [x] Status
