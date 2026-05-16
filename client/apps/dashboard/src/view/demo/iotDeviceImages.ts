// IoT sensor images from client/apps/iot-demo/public (bundled by Vite for /demo).

import deviceLightPar from '../../../../iot-demo/public/device-light-par.png';
import deviceNpk from '../../../../iot-demo/public/device-npk.png';
import devicePh from '../../../../iot-demo/public/device-ph.png';
import deviceRainGauge from '../../../../iot-demo/public/device-rain-gauge.png';
import deviceSoilMoisture from '../../../../iot-demo/public/device-soil-moisture.png';
import deviceTempHumidity from '../../../../iot-demo/public/device-temp-humidity.png';

export const iotDeviceImages = {
  'soil-moisture-sensor': deviceSoilMoisture,
  'temp-humidity-sensor': deviceTempHumidity,
  'soil-ph-sensor': devicePh,
  'light-par-sensor': deviceLightPar,
  'rain-gauge': deviceRainGauge,
  'npk-sensor': deviceNpk,
} as const;
