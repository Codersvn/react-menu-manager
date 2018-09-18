import * as React from 'react';
import EditorComponent from './EditorComponent/EditorComponent';
import { connect } from 'react-redux';
import { FETCH_MENU_REQUESTED } from '../../store/action';

class MenuComponent extends React.Component {
  componentDidMount() {
    const { dispatch, id } = this.props as any;
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
