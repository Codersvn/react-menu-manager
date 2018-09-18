import * as $ from 'jquery';
import * as React from 'react';
import { connect } from 'react-redux';
import { isArray } from 'lodash-es';
import { forEach, map } from 'lodash-es';

import Nestable from '../../../../libs/Nestable/jquery.nestable';
import EditItemComponent from './EditItemComponent';
import { SortedItem } from '../../../models/SortedItem';
import { SORT_MENU, SAVE_MENU_REQUESTED } from '../../../store/action';

class EditorComponent extends React.Component {
  myRef: any;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidUpdate() {
    const { payload, dispatch } = this.props as any;

    const nestable = new Nestable();
    nestable.init($(this.myRef.current).find('.dd')[0]);

    $(this.myRef.current)
      .find('.dd')
      .on('change', function() {
        const nestable = new Nestable();
        const data = nestable.get(this, 'serialize');
        let items = [];
        forEach(payload.menus, menu => {
          items = [...items, ...menu.flat()];
        });
        let sorted_items = data.map(i => new SortedItem(i));
        sorted_items = map(sorted_items, i => i.transform(items));
        dispatch({ type: SORT_MENU, data: sorted_items, menu_id: payload.id });
      });
  }
  save() {
    const { payload, dispatch } = this.props as any;
    dispatch({ type: SAVE_MENU_REQUESTED, data: payload });
  }

  render() {
    const { payload } = this.props as any;
    let Items;
    if (payload !== undefined && payload.id !== undefined && isArray(payload.menus)) {
      Items = payload.menus.map((i, k) => (
        <li key={k} className="dd-item" data-id={i.id}>
          <div className="dd-handle">
            <div className="row">
              <div className="col">{i.label}</div>
              <div className="col text-right">
                <span>{i.link}</span>
              </div>
            </div>
          </div>
          <div className="delete_item" data-id="${item.id}">
            <div className="trash icon" />
          </div>
          <EditItemComponent />
          <div dangerouslySetInnerHTML={{ __html: i.render() }} />
        </li>
      ));
    }
    return (
      payload !== undefined &&
      payload.id !== undefined &&
      isArray(payload.menus) && (
        <div className="menu-editor" ref={this.myRef}>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <form name="edit_form">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Label" name="label" required />
                    </div>
                    <div className="form-group">
                      <input type="link" className="form-control" placeholder="Link" name="link" required />
                    </div>
                    <div className="form-group">
                      <input type="hidden" className="form-control" name="menu_item_id" required />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <form name="add_menu_form">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="label" name="label" />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Link" name="link" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add Item
                    </button>
                  </form>
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
