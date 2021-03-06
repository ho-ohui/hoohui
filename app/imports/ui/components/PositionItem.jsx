import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PositionItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.position.name}</Table.Cell>
          <Table.Cell>{this.props.position.requirement}</Table.Cell>
          <Table.Cell>{this.props.position.description}</Table.Cell>
          <Table.Cell>
            <Link to={`/editposition/${this.props.position._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
PositionItem.propTypes = {
  position: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PositionItem);
