import * as React from 'react';
import { connect } from 'react-redux';
import * as $ from 'jquery';
import { DELETE_MENU_ITEM } from '../../../store/action';

class DeleteItemComponent extends React.Component {
  deleteItem(event) {
    const { dispatch, menu_item_id } = this.props as any;
    const el = $(event.target).closest('.dd-item');
    el.remove();
    dispatch({ type: DELETE_MENU_ITEM, data: menu_item_id });
  }
  render() {
    return (
      <div className="delete_menu_item_btn" data-id="${item.id}" onClick={this.deleteItem.bind(this)}>
        <div className="trash icon" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    payload: state.NewMenu.items.find(i => Number(i.menu_id) === Number(props.id))
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
)(DeleteItemComponent);
