import React from 'react';
import { Row, Col } from 'antd';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from '../components/Header';
import Main from './Main';
import Users from './Users';
import User from './User';
import { connect } from 'react-redux';

function Private(props) {
  return (
    <BrowserRouter>
      <Header />
      <div className="wrapper">
        <Row>
          <Col span={18} offset={3}>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/users/:id" exact component={User} />
              <Route path="/users" exact component={Users} />
            </Switch>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Private);