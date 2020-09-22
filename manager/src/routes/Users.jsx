import React, { Fragment, useState } from 'react';
import Line from '../components/Line';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import UsersList from '../components/UsersList';
import UserForm from '../components/UserForm';
import { useMutation } from 'urql';
import { connect } from 'react-redux';
import { unauthorize } from '../actions/auth';

function Users(props) {
  const [visible, setVisible] = useState(false);
  const CreateUserMutation = `
    mutation CreateUserMutation($name: String!, $email: String!, $password: String!, $date: String, $token: String!) {
      createUser(userInput: {name: $name, email: $email, password: $password, date: $date, token: $token}) {
        _id
        name
        email
        avatar
        date
      }
    }
  `;
  const [createResult, createUser] = useMutation(CreateUserMutation);
  return (
    <Fragment>
      <h1>Users page</h1>
      <Line />
      <Button
        type="primary"
        className="sector"
        onClick={() => { setVisible(true) }}
      >
        <PlusOutlined />
        <span>Add User</span>
      </Button>
      <UsersList />
      <Drawer
        title="Add new hero"
        width={720}
        onClose={() => { setVisible(false) }}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <UserForm
          sendbackData={args => {
            createUser({
              name: args.name,
              email: args.email,
              date: args.date,
              password: args.password,
              token: localStorage.token
            })
              .then(_ => {
                if (_.error) {
                  console.error('Oh no!', _.error);
                  props.unauthorize();
                }
                setVisible(false);
              });
          }}
          reset='reset'
        />
      </Drawer>
    </Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    unauthorize: () => dispatch(unauthorize())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Users);