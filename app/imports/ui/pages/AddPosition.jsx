import React from 'react';
import { Positions, PositionSchema } from '/imports/api/position/position';
import { Grid, Segment, Header, TextArea } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddPosition extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, requirement, description } = data;
    const owner = Meteor.user().username;
    Positions.insert({ name, requirement, description, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const transparent={backgroundColor: 'transparent'};
    return (
        <div className="connect-background">
          <div className="page-layer">
            <Grid container centered>
              <Grid.Column>
                <AutoForm ref={(ref) => {
                  this.formRef = ref;
                }} schema={PositionSchema} onSubmit={this.submit}>
                  <Header as="h1" textAlign="center" inverted>Add Position</Header>
                  <Segment style={transparent} inverted className="addForms">
                    <TextField name='name'/>
                    <LongTextField name='description'/>

                    <LongTextField name="requirement"/>

                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name='owner' value='fakeuser@foo.com'/>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

export default AddPosition;
