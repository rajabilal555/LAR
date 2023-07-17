import { Layout, Result, Row } from "antd";
import { ipcRenderer } from "electron";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const { Header, Content } = Layout;

const ipc = ipcRenderer || false;

function Home() {
  const [intervalSetting, setIntervalSetting] = useState<number>();

  useEffect(() => {
    if (ipc) {
      ipc
        .invoke("getSettingValue", "interval")
        .then((v) => setIntervalSetting(v));
    }
  }, []);

  return (
    <React.Fragment>
      {/* @ts-ignore */}
      <Head>
        <title>The Look away reminder APP</title>
      </Head>

      <Header>
        <Row justify="end">
          <Link href="/settings">
            <a>Open Settings</a>
          </Link>
        </Row>
      </Header>

      <Content>
        <div style={{ padding: 48, textAlign: "center" }}>
          <Result
            icon={<img src="/images/logo.png" />}
            title="LAR"
            subTitle="Look away Reminder"
          />
          <p>We will show a notification every {intervalSetting} seconds.</p>
        </div>
      </Content>
    </React.Fragment>
  );
}

export default Home;
