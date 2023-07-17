import {
  Button,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Space,
  notification,
} from "antd";
import Title from "antd/lib/typography/Title";
import { ipcRenderer } from "electron";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
const { Item: FormItem } = Form;

const { Header, Content } = Layout;

const ipc = ipcRenderer || false;

function Next() {
  const [intervalSetting, setIntervalSetting] = useState<number>();
  const [messageSetting, setMessageSetting] = useState<string>();
  const [notifApi, contextHolder] = notification.useNotification();

  const showSuccessToast = () => {
    notifApi.success({
      message: "Updated Settings",
      description: "The settings have been updated!!",
    });
  };
  const showErrorToast = () => {
    notifApi.error({
      message: "Updated Failed",
      description: "The settings could not be updated!!",
    });
  };

  const showTestNotification = () => {
    if (ipc) {
      ipc.send("show:testNotification");
    }
  };

  const saveUserSettings = () => {
    if (ipc) {
      const settings: SettingsStoreType = {
        interval: intervalSetting,
        message: messageSetting,
      };

      ipc.invoke("updateSettings", settings).then((success) => {
        if (success) {
          showSuccessToast();
        } else {
          showErrorToast();
        }
      });
    }
  };

  useEffect(() => {
    if (ipc) {
      //? Fill the form fields
      ipc
        .invoke("getSettingValue", "interval")
        .then((v) => setIntervalSetting(v));
      ipc
        .invoke("getSettingValue", "message")
        .then((v) => setMessageSetting(v));
    }
    return () => {
      // like componentWillUnmount()
      // ipcRenderer.removeAllListeners("response:save:userSettings");
    };
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <Head>
        <title>LAR Settings</title>
      </Head>

      <Header>
        {/* <Link href="/home">
          <a>&lt; Back</a>
        </Link> */}
      </Header>

      <Content>
        {contextHolder}
        <Space
          style={{ display: "block", marginTop: 16 }}
          align="center"
          direction="vertical">
          <Title level={2} style={{ textAlign: "center" }}>
            LAR Settings
          </Title>
          <div style={{ padding: 48 }}>
            <Form layout="horizontal">
              <FormItem
                label="Reminder interval"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}>
                <InputNumber
                  min={1}
                  addonAfter={"seconds"}
                  value={intervalSetting}
                  onChange={(v) => setIntervalSetting(v)}
                  name="inputInterval"
                />
              </FormItem>
              <FormItem
                label="Reminder Message"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}>
                <Input
                  value={messageSetting}
                  onChange={(v) => setMessageSetting(v.target.value)}
                  name="inputMessage"
                />
              </FormItem>
              <div style={{ marginTop: 48 }}>
                <Row justify="space-between">
                  <Space>
                    <Link href="/home">
                      <Button size="large">Back</Button>
                    </Link>
                    <Button
                      size="large"
                      type="primary"
                      onClick={saveUserSettings}>
                      Save Settings
                    </Button>
                  </Space>

                  <Button
                    style={{ float: "right" }}
                    size="large"
                    type="dashed"
                    onClick={showTestNotification}>
                    Send Test Notification
                  </Button>
                </Row>
              </div>
            </Form>
          </div>
        </Space>
      </Content>
    </>
  );
}

export default Next;
