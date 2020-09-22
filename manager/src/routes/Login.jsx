import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { authorize } from '../actions/auth';
import { useMutation } from 'urql';

function Login(props) {
  const LoginUserMutation = `
    mutation LoginUserMutation($email: String!, $password: String!) {
      authUser(userAuth: {email: $email, password: $password}) {
        token
      }
    }
  `;
  const [loginResult, loginUser] = useMutation(LoginUserMutation);
  return (
    <div style={{ padding: '35px 55px' }}>
      <h3>Login page</h3>
      <hr />
      <Form
        layout="vertical"
        onFinish={values => {
          loginUser(values)
            .then(res => {
              localStorage.setItem('token', res.data.authUser.token);
              props.authorize();
            })
            .catch(err => console.log(err));
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter user email' }]}
            >
              <Input placeholder="Please enter user email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Please enter user password" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    authorize: () => dispatch(authorize())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login);