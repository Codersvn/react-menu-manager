import * as React from 'react';
import EditorComponent from './EditorComponent/EditorComponent';
import { connect } from 'react-redux';
import { FETCH_MENU_REQUESTED } from './EditorComponent/editor.action';

class MenuComponent extends React.Component {
  componentDidMount() {
    const { dispatch, id } = this.props as any;
    dispatch({ type: FETCH_MENU_REQUESTED, data: id });
  }
  render() {
    return <EditorComponent />;
  }
}

const mapStateToProps = state => {
  return {
    payload: state.Menu
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
