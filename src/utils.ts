import { Device } from "./types";

export function getDeviceIcon(deviceName: string) {
  if (deviceName.includes("Apple TV") || deviceName.includes("TV")) {
    return "appletv.fill.png";
  }

  if (deviceName.includes("iPad") || deviceName.includes("Tablet")) {
    return "ipad.landscape.png";
  }

  if (deviceName.includes("Watch")) {
    return "applewatch.png";
  }

  return "iphone.png";
}

export function sortDevices(a: Device, b: Device) {
  if (a.booted === b.booted) {
    return 0;
  }
  if (a.booted) {
    return -1;
  }
  return 1;
}
