import { List } from "@raycast/api";
import { Command, Platform } from "./types";
import DeviceList from "./DeviceList";
import useDevices from "./useDevices";

export default function Command() {
  const { devices: iosDevices, commands: iosCommands } = useDevices(Platform.ios);
  const { devices: androidDevices, commands: androidCommands } = useDevices(Platform.android);

  const isLoading = androidDevices.length === 0 && iosDevices.length === 0;

  return (
    <List isLoading={isLoading}>
      <DeviceList name="Android" platform={Platform.android} devices={androidDevices} commands={androidCommands} />
      <DeviceList name="iOS" platform={Platform.ios} devices={iosDevices} commands={iosCommands} />
    </List>
  );
}
