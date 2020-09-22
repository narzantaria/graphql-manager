import React, { Fragment } from 'react';
import { message } from 'antd';
import { useQuery, useMutation } from 'urql';
import UserForm from '../components/UserForm';

function User(props) {
  const UserQuery = `
    query UserQuery($id: ID!) {
      findUser(id: $id) {
        _id
        name
        email
        date
      }
    }
  `;
  const UpdateUserMutation =`
    mutation UpdateUserMutation($id: ID!, $name: String!, $email: String!, $password: String!, $date: String) {
      updateUser(userUpdate: {_id: $id, name: $name, email: $email, password: $password, date: $date}) {
        _id
        name
        email
        date
      }
    }
  `;
  const [res, executeQuery] = useQuery({
    query: UserQuery,
    variables: { id: props.match.params.id }
  });
  const [updateResult, updateUser] = useMutation(UpdateUserMutation);
  const success = () => {
    message.success('Document updated successfully');
  };
  if (res.fetching) return <p>Loading...</p>;
  if (res.error) return <p>Errored!</p>;
  const user = res.data.findUser;
  return (
    <Fragment>
      <UserForm
        data={user}
        sendbackData={args => {
          updateUser({
            id: props.match.params.id,
            name: args.name,
            email: args.email,
            date: args.date
          });
          success();
        }}
      />
    </Fragment>
  );
}

export default User;