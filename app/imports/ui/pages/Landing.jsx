import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Header, Form, Message, Segment, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

   /** Initialize component state with properties for login and redirection. */
   constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.flag = '';
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        if (Meteor.user().profile === 'company') this.flag = 'company';
        if (Meteor.user().profile === 'student') this.flag = 'student';
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  render() {
    const text = {textAlign: 'center', fontSize: '18px'};
    const links = {textAlign: 'center'};
    const { from } = this.props.location.state || { from: { pathname: `/${this.flag}home` } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      console.log(this.flag);
      return <Redirect to={from}/>;
    }
    return (
        <div className='connect-background'>
          <Grid textAlign="center" verticalAlign="middle" centered columns={1}>
            <Grid.Column>
              <Image src='/images/AlohaConnectLogo.png' size='large'/>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <div style={text}>
                    Login to continue your journey!
                  </div>
                  <Form.Input
                      label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                  <div style={text}>
                    Don't have an account?
                  </div>
                  <Message style={links}>
                    <Link to="/signupstudent">Click here to Register as a Student</Link>
                  </Message>
                  <Message style={links}>
                    <Link to="/signupcompany">Click here to Register as a Company</Link>
                  </Message>
                </Segment>
              </Form>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Login was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </div>  
    );
  }
}

export default Landing;
