import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from 'urql';
import { connect } from 'react-redux';
import { unauthorize } from '../actions/auth';

function UsersList(props) {
  const [res, executeQuery] = useQuery({
    query: `
      query {
        users {
          _id
          name
          email
          avatar
          date
        }
      }
    `,
  });
  const RemoveUserMutation = `
    mutation RemoveUserMutation($id: ID!, $token: String!) {
      deleteUser(userRemove: {_id: $id, token: $token}) {
        _id
        name
        email
      }
    }
  `;
  const [removeResult, removeUser] = useMutation(RemoveUserMutation);
  if (res.fetching) return <p>Loading...</p>;
  if (res.error) return <p>Errored!</p>;
  const { users } = res.data;
  return (
    <Fragment>
      {users.map(user => (
        <Fragment>
          <Row className="line">
            <Col span={12}>
              <Link to={`/users/${user._id}`}>
                <img src={user.avatar} alt=""/>
                <h3>{user.name}</h3>
              </Link>
            </Col>
            <Col span={6}>{user.date}</Col>
            <Col span={6}>
              <DeleteOutlined
                className="delete"
                onClick={() => {
                  removeUser({
                    id: user._id,
                    token: localStorage.token
                  })
                  .then(_ => {
                    if (_.error) {
                      console.error('Oh no!', _.error);
                      props.unauthorize();
                    }
                  });
                }}
              />
            </Col>
          </Row>
        </Fragment>
      ))}
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
)(UsersList);