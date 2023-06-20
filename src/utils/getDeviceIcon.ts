export function getDeviceIcon(deviceName: string) {
  if (deviceName.includes("Apple TV")) {
    return "appletv.fill.png";
  }

  return "iphone.png";
}
