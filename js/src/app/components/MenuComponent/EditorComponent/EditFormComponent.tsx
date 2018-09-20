import * as React from 'react';
import { connect } from 'react-redux';
import { CLOSE_EDIT_ITEM_FORM, EDIT_MENU_ITEM, UPDATE_MENU_ITEM } from '../../../store/action';

class EditFormComponent extends React.Component {
  closeEditForm() {
    const { dispatch, id } = this.props as any;
    dispatch({ type: CLOSE_EDIT_ITEM_FORM, menu_id: id });
  }

  handleChange(event) {
    const { dispatch, id } = this.props as any;
    dispatch({ type: EDIT_MENU_ITEM, menu_id: id, label: event.target.getAttribute('name'), data: event.target.value });
  }

  updateMenuItem(event) {
    event.preventDefault();
    const { payload, dispatch, id } = this.props as any;
    dispatch({ type: UPDATE_MENU_ITEM, menu_id: id, data: payload.data });
  }

  render() {
    const { payload } = this.props as any;
    return payload !== undefined && payload.show_edit_form ? (
      <form name="edit_form">
        <div className="form-group">
          <input type="text" className="form-control" value={payload.data.label} placeholder="Label" name="label" onChange={this.handleChange.bind(this)} required />
        </div>
        <div className="form-group">
          <input type="link" className="form-control" value={payload.data.link} placeholder="Link" name="link" onChange={this.handleChange.bind(this)} required />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.updateMenuItem.bind(this)}>
          Update
        </button>
        <button type="submit" className="btn btn-link" onClick={this.closeEditForm.bind(this)}>
          Close
        </button>
      </form>
    ) : null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    payload: state.EditItem.items.find(i => Number(i.menu_id) === Number(props.id))
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
)(EditFormComponent);
