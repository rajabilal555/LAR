import { Layout, Result, Row } from "antd";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const { Header, Content } = Layout;

function Home() {
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
          <p>
            Will show a notification every 2 minutes or 120 seconds by default.
          </p>
        </div>
      </Content>
    </React.Fragment>
  );
}

export default Home;
