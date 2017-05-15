import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/idea.css';

const highlight = (instance) => {
  const domNode = ReactDOM.findDOMNode(instance);
  hljs.highlightBlock(domNode);
};

export default class CSSBeautyContainer extends React.Component {
  componentDidMount() {
    highlight(this);
  }

  componentDidUpdate() {
    highlight(this);
  }

  render() {
    return <pre style={{
      width: '100%',
      heigth: '100%',
    }}>{this.props.value}</pre>;
  }
}
