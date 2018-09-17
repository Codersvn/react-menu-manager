import * as $ from 'jquery';
import * as React from 'react';
import { connect } from 'react-redux';
import { isArray } from 'lodash-es';

import Nestable from '../../../../libs/Nestable/jquery.nestable';
import EditItemComponent from './EditItemComponent';
class EditorComponent extends React.Component {
  myRef: any;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidUpdate() {
    new Nestable($(this.myRef.current).find('.dd')[0]);
  }

  render() {
    const { payload } = this.props as any;

    let Items;
    if (payload !== undefined && payload.id !== undefined && isArray(payload.menus)) {
      Items = payload.menus.map((i, k) => (
        <li key={k} className="dd-item" data-id="${item.id}" data-label="${item.label}" data-link="${item.link}" data-parent="${item.parent_id}">
          <div className="dd-handle" id="label_item_${item.id}">
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
                  <div id="save_menu" className="btn btn-success">
                    Save
                  </div>
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
