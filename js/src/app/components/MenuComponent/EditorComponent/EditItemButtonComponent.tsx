import * as React from 'react';
import { connect } from 'react-redux';
import { SHOW_EDIT_ITEM_FORM } from '../../../store/action';

class EditItemButtonComponent extends React.Component {
  handleClick() {
    const { dispatch, payload, id, menu_item_id } = this.props as any;
    dispatch({ type: SHOW_EDIT_ITEM_FORM, data: payload.findItem(menu_item_id), menu_id: id });
  }

  render() {
    return (
      <div className="edit_menu_item" onClick={this.handleClick.bind(this)}>
        <div className="edit icon" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    payload: state.Menu.items.find(i => Number(i.id) === Number(props.id))
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
)(EditItemButtonComponent);
