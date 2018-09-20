import * as React from 'react';
import { connect } from 'react-redux';
import { SET_NEW_ITEM_FIELD, CREATE_MENU_ITEM_REQUESTED } from '../../../store/action';

class AddItemComponent extends React.Component {
  submit(event) {
    const { payload, dispatch } = this.props as any;
    dispatch({ type: CREATE_MENU_ITEM_REQUESTED, data: payload });
    event.preventDefault();
  }
  handleChange(event) {
    const { payload, dispatch } = this.props as any;
    dispatch({ type: SET_NEW_ITEM_FIELD, data: event.target.value, field: event.target.getAttribute('name'), menu_id: payload.menu_id });
  }
  render() {
    return (
      <form name="add_menu_form" onSubmit={this.submit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="label" name="label" onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Link" name="link" onChange={this.handleChange.bind(this)} />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    payload: state.New.items.find(i => Number(i.menu_id) === Number(props.id))
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
)(AddItemComponent);
