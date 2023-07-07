import { Button, Form, InputNumber, Layout, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import Head from "next/head";
const { Item: FormItem } = Form;

const { Header, Content } = Layout;
const showTestNotification = () => {
  new Notification("Look Away 🔔", {
    body: "Avert yer eyeees!!!!",
  }).onclick = () => console.log("Averted!!!");
};
function Next() {
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
                  defaultValue={120}
                  name="inputNumber"
                />
              </FormItem>

              <div style={{ marginTop: 48 }}>
                <Row justify="space-between">
                  <Space>
                    <Button size="large" href="/home">
                      Back
                    </Button>
                    <Button size="large" type="primary" htmlType="submit">
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
