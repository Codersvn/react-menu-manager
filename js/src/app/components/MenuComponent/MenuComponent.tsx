import * as React from 'react';
import EditorComponent from './EditorComponent/EditorComponent';
import { connect } from 'react-redux';
import * as _ from 'lodash/core';
import { FETCH_MENU_REQUESTED, SET_BASE_API_URL } from '../../store/action';

class MenuComponent extends React.Component {
  componentDidMount() {
    const { dispatch, id, options } = this.props as any;
    if (!_.isUndefined(options.api_url)) {
      dispatch({ type: SET_BASE_API_URL, data: options.api_url });
    }
    dispatch({ type: FETCH_MENU_REQUESTED, data: id });
  }
  render() {
    const { id } = this.props as any;
    return <EditorComponent id={id} />;
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
)(MenuComponent);
