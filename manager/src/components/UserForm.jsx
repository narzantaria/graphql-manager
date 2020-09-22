import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';

function UserForm(props) {
  const [data, setData] = useState(props.data);
  const [form] = Form.useForm();

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        ...data,
        date: data ? moment(new Date(data.date), dateFormat) : ''
      }}
      onFinish={values => {
        props.sendbackData({
          ...values,
          date: new Date(values.date).toISOString()
        });
        props.reset && form.resetFields();
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
          >
            <Input placeholder="Please enter user email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
          >
            <Input placeholder="Please enter user password" />
          </Form.Item>
          <Form.Item label="User registration date" name="date">
            <DatePicker
              size="medium"
              format={dateFormat}
              placeholder="User registration date"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >Save</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default UserForm;