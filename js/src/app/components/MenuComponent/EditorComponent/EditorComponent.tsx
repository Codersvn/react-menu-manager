import * as $ from 'jquery';
import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash/core';
import Nestable from '../../../../libs/Nestable/jquery.nestable';
import EditItemButtonComponent from './EditItemButtonComponent';
import { SortedItem } from '../../../models/SortedItem';
import { SAVE_MENU_REQUESTED, DELETE_MENU_ITEM, SHOW_EDIT_ITEM_FORM } from '../../../store/action';
import AddItemComponent from './AddItemComponent';
import * as Parser from 'html-react-parser';
import DeleteItemComponent from './DeleteItemComponent';
import EditFormComponent from './EditFormComponent';

class EditorComponent extends React.Component {
  myRef: any;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidUpdate() {
    const nestable = new Nestable();
    nestable.init($(this.myRef.current).find('.dd')[0]);
  }
  save() {
    const { payload, dispatch } = this.props as any;
    const nestable = new Nestable();
    const data = nestable.get($(this.myRef.current).find('.dd')[0], 'serialize');
    let items = [];
    _.forEach(payload.menus, menu => {
      items = [...items, ...menu.flat()];
    });

    let sorted_items = data.map(i => new SortedItem(i));

    sorted_items = _.map(sorted_items, i => i.transform(items));
    dispatch({ type: SAVE_MENU_REQUESTED, data: { ...payload, ...{ menus: sorted_items } } });
  }

  render() {
    const { payload, dispatch, id } = this.props as any;
    setTimeout(() => {
      $('.delete_menu_item_btn.sub_item').on('click', function(event) {
        const el = $(event.target).closest('.dd-item');
        el.remove();
        dispatch({ type: DELETE_MENU_ITEM, data: el.attr('data-id') });
      });
      $('.edit_menu_item.sub_item').on('click', function(event) {
        const el = $(event.target).closest('.dd-item');
        const menu_item_id = el.attr('data-id');
        let items = [];
        _.forEach(payload.menus, menu => {
          items = [...items, ...menu.flat()];
        });
        let find = _.find(items, item => Number(item.id) === Number(menu_item_id));
        if (!_.isUndefined(find)) {
          dispatch({ type: SHOW_EDIT_ITEM_FORM, data: find, menu_id: id });
        }
      });
    }, 200);

    let Items;
    if (payload !== undefined && payload.id !== undefined && _.isArray(payload.menus)) {
      Items = payload.menus.map((i, k) => {
        if (_.isArray(i.menus) && i.menus.length > 0) {
          return (
            <li key={k} className="dd-item" data-id={i.id}>
              <div className="dd-handle">
                <div className="row">
                  <div className="col">{i.label}</div>
                  <div className="col text-right">
                    <span>{i.link}</span>
                  </div>
                </div>
              </div>
              <DeleteItemComponent id={payload.id} menu_item_id={i.id} />
              <EditItemButtonComponent id={payload.id} menu_item_id={i.id} />
              {Parser(i.render())}
            </li>
          );
        } else {
          return (
            <li key={k} className="dd-item" data-id={i.id}>
              <div className="dd-handle">
                <div className="row">
                  <div className="col">{i.label}</div>
                  <div className="col text-right">
                    <span>{i.link}</span>
                  </div>
                </div>
              </div>
              <DeleteItemComponent id={payload.id} menu_item_id={i.id} />
              <EditItemButtonComponent id={payload.id} menu_item_id={i.id} />
            </li>
          );
        }
      });
    }
    return (
      payload !== undefined &&
      payload.id !== undefined &&
      _.isArray(payload.menus) && (
        <div className="menu-editor" ref={this.myRef}>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <EditFormComponent id={payload.id} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <AddItemComponent id={payload.id} />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <div className="dd">
                    <ol className="dd-list">{Items}</ol>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button className="btn btn-success" onClick={this.save.bind(this)}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
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
)(EditorComponent);
