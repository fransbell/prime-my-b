// IoT sensor device images — original artwork from iot-demo app.
// Copied to apps/dashboard/public/

import deviceSoilMoisture from '/public/device-soil-moisture.png';
import deviceTempHumidity from '/public/device-temp-humidity.png';
import devicePh from '/public/device-ph.png';
import deviceLightPar from '/public/device-light-par.png';
import deviceRainGauge from '/public/device-rain-gauge.png';
import deviceNpk from '/public/device-npk.png';

export const iotDeviceImages = {
  'soil-moisture-sensor': deviceSoilMoisture,
  'temp-humidity-sensor': deviceTempHumidity,
  'soil-ph-sensor': devicePh,
  'light-par-sensor': deviceLightPar,
  'rain-gauge': deviceRainGauge,
  'npk-sensor': deviceNpk,
} as const;
