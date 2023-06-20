import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { runAppleScript } from "run-applescript";
import { getDeviceIcon } from "./utils/getDeviceIcon";

interface Device {}

async function getDevices(platform = "ios") {
  const devices = await runAppleScript(`
    tell application "MiniSim"
        getDevices platform "${platform}"
    end tell
  `);
  return JSON.parse(devices);
}

export default function Command() {
  const [androidDevices, setAndroidDevices] = useState([]);
  const [iosDevices, setIOSDevices] = useState([]);

  useEffect(() => {
    getDevices("ios").then(setIOSDevices);
    getDevices("android").then(setAndroidDevices);
  }, []);

  console.log(iosDevices);

  return (
    <List>
      <List.Section title="iOS">
        {iosDevices?.map(({ name, ID }) => (
          <List.Item
            key={ID}
            title={name}
            icon={getDeviceIcon(name)}
            actions={
              <ActionPanel>
                <Action
                  icon={Icon.Trash}
                  title="Delete Simulator"
                  onAction={() => {
                    console.log("delete");
                  }}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
      <List.Section title="Android">
        {androidDevices?.map(({ name }) => (
          <List.Item
            key={name}
            title={name}
            icon={getDeviceIcon(name)}
            actions={
              <ActionPanel>
                <Action
                  title="Delete Simulator"
                  onAction={() => {
                    console.log("delete");
                  }}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
