import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import { Command, Device, Platform } from "./types";
import { getCommands, getDevices } from "./actions";
import { sortDevices } from "./utils";
import DeviceList from "./DeviceList";

export default function Command() {
  const [androidDevices, setAndroidDevices] = useState<Device[]>([]);
  const [iosDevices, setIOSDevices] = useState<Device[]>([]);
  const [androidCommands, setAndroidCommands] = useState<Command[]>([]);
  const [iosCommands, setIOSComands] = useState<Command[]>([]);

  const isLoading = androidDevices.length === 0 && iosDevices.length === 0;

  useEffect(() => {
    const fetchDevices = async () => {
      const [iosDevices, androidDevices, iosCommands, androidCommands] = await Promise.all([
        getDevices(Platform.ios),
        getDevices(Platform.android),
        getCommands(Platform.ios),
        getCommands(Platform.android),
      ]);
      setIOSDevices(iosDevices?.sort(sortDevices));
      setAndroidDevices(androidDevices?.sort(sortDevices));
      setIOSComands(iosCommands);
      setAndroidCommands(androidCommands);
    };

    fetchDevices().catch(console.error);
  }, []);

  return (
    <List isLoading={isLoading}>
      <DeviceList name="Android" platform={Platform.android} devices={androidDevices} commands={androidCommands} />
      <DeviceList name="iOS" platform={Platform.ios} devices={iosDevices} commands={iosCommands} />
    </List>
  );
}
