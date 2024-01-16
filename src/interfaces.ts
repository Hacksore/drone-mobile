export interface VehicleResponse {
  count: number;
  next?: null | string;
  previous?: null | string;
  results: ResultsEntity[];
}

export interface ResultsEntity {
  id: string;
  device_key: string;
  vin: string;
  vehicle_make: string;
  vehicle_name: string;
  create_date: string;
  update_date: string;
  last_movement_timestamp: string;
  runtime: number;
  initial_runtime: number;
  vehicle_model: string;
  vehicle_license_plate: string;
  vehicle_year: number;
  subscriber_id: number;
  image: string;
  last_known_state: LastKnownState;
  towing_detected: boolean;
  crash_detected?: null;
  dtc_codes?: null;
  dtc_error_count?: null;
  hard_braking?: null;
  hard_cornering?: null;
  harsh_acceleration?: null;
  normal_start_mode_status: boolean;
  panic_status: boolean;
  remote_start_status: boolean;
  tach_learning_status: boolean;
  temperature_start_mode_status: boolean;
  timer_start_mode_status: boolean;
  trigger_start_mode_status: boolean;
  turbo_start_mode_status: boolean;
  turbo_status: boolean;
  battery_off: boolean;
  battery_reconnected: boolean;
  low_battery: boolean;
  service_due: boolean;
  starting_mileage: number;
  is_pending_transfer: boolean;
  new_pending_owner?: null;
  in_geofence: boolean;
  dealer_profile?: null;
  current_geofences?: null[] | null;
}

export interface LastKnownState {
  i_o_status: IOStatus;
  imei: string;
  iccid: string;
  carrier: string;
  ble_mac_address: string;
  firmware_version: string;
  ble_firmware_version: number;
  controller_model: string;
  controller_version?: null;
  current_cellular_network: number;
  cellular_signal_strength: number;
  backup_battery_voltage: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  gps_direction: string;
  gps_degree: number;
  mileage: number;
  controller: Controller;
}
export interface IOStatus {
  poc_1_configuration: number;
  poc_2_configuration: number;
  poc_3_configuration: number;
  pic_1_configuration: number;
  fota_status: boolean;
  backup_battery_status: boolean;
}

export interface Controller {
  armed: boolean;
  door_open: boolean;
  trunk_open: boolean;
  hood_open: boolean;
  engine_on: boolean;
  ignition_on: boolean;
  reservation_status: boolean;
  timer_start_enabled: boolean;
  siren_enabled: boolean;
  shock_sensor_enabled: boolean;
  turbo_timer_start_enabled: boolean;
  passive_arming_enabled: boolean;
  valet_mode_enabled: boolean;
  auto_door_lock_enabled: boolean;
  drive_lock_enabled: boolean;
  current_temperature: number;
  main_battery_voltage: number;
}
