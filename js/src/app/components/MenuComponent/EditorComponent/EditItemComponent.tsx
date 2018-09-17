import * as React from 'react';
import { connect } from 'react-redux';

class EditItemComponent extends React.Component {
  render() {
    return (
      <div className="edit_item" data-label="${item.label}" data-link="${item.link}" data-item-id="${item.id}">
        <div className="edit icon" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    payload: state.Menu.Editor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditItemComponent);
