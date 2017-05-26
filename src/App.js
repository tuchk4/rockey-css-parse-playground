import React, { Component } from 'react';
import createParser from 'rockey-css-parse';
import stringify from 'rockey-css-parse/stringify';
import Box from 'react-layout-components'

import cssbeautify from 'cssbeautify';
import vendorPrefix from 'rockey/plugins/vendorPrefix';
import validateCSSRule from 'rockey/plugins/validateCSSRule';

import Tabs from './components/Tabs';
import PropsEditor from './components/PropsEditor';
import ErrorBox from './components/ErrorBox';
import CodeMirror from './components/CodeMirror';
import TopMenu from './components/TopMenu';
import ClassNameConfigurator from './components/ClassNameConfigurator';


const preapre = precess =>  precess.map(p => {
  const processed = {};
  processed.selector = p.selector;

  if (p.styles) {
    processed.styles = p.styles;
  }

  if (p.frames) {
    processed.frames = preapre(p.frames);
  }
  // processed.root = p.root;

  if (p.mixins && p.mixins.length) {
    processed.mixins = `"${p.mixins.length}" mixin functions`;
  }

  if (p.media) {
    processed.media = p.media;
  }

  return processed;
});

const DEFAULT_PROPS = [{
  key: 'color',
  value: 'red'
}];

const DEFAULT_STYLES = `Button {
  color: red;

  :hover {
    color: green;

    Icon {
      color: black;
    }
  }
}

Layer {
  padding: 15px;

  Button {
    margin: 0;
  }
}
`;

let parse = null;

class App extends Component {

  state = {
    code: null,
    classNameFunction: 'c-${name}',
    classNameFunctionError: null,
    css: '',
    beauty: '',
    precss: null,
    props: [{
      key: 'color',
      value: 'green'
    }]
  }

  warnings = {
    vendorPrefix: [],
    validateCSSRule: [],
  };

  componentWillMount() {
    const code = localStorage.getItem('code');
    const classNameFunction = localStorage.getItem('classNameFunction');
    const props = JSON.parse(localStorage.getItem('props'));

    if (classNameFunction) {
      this.updateClassNameFunction(classNameFunction);
    }

    this.updateResult(code || DEFAULT_STYLES, props || DEFAULT_PROPS);
  }

  updateWarnigns(type, warning) {
    this.warnings[type].push({
      message: warning
    });
  }

  updateResult(code, props = this.state.props) {
    let parsed = null;
    let css = null;
    let syntaxError = null;

    this.warnings = {
      vendorPrefix: [],
      validateCSSRule: [],
    };

    try {
      // parsed = parse(code);
      parsed = eval('parse`' + code + '`');

      const cssProps = props.reduce((props, prop) => {
        props[prop.key] = prop.value;
        return props;
      }, {});

      css = stringify(parsed.precss, cssProps);
    } catch (e) {
      syntaxError = e;
    }

    localStorage.setItem('code', code);
    localStorage.setItem('props', JSON.stringify(props));

    this.setState({
      code,
      css,
      syntaxError,
      props,
      warnings: this.warnings,
      precss: syntaxError ? null : preapre(parsed.precss),
      beauty: syntaxError ? null : cssbeautify(css)
    });
  }

  updateClassNameFunction(classNameFunction) {
    const state = {
      classNameFunctionError: false
    };

    state.classNameFunction = classNameFunction;
    state.getClassName = eval('(name)=>`'+ classNameFunction +'`')

    try {
      state.getClassName('zxc');
      parse = createParser({
        getClassName: state.getClassName,
        plugins: [
          vendorPrefix(message => {
            this.updateWarnigns('vendorPrefix', message);
          }),
          validateCSSRule(message => {
            this.updateWarnigns('validateCSSRule', message);
          })
        ]
      });
    } catch(e) {
      state.classNameFunctionError = true;
    }

    localStorage.setItem('classNameFunction', classNameFunction);
    this.setState(state);
  }

  handleConfigChange = (e) => {
    this.updateClassNameFunction(e.target.value);
    this.updateResult(this.state.code);
  }

  handleOnChange = code => {
    this.updateResult(code);
  }

  handleOnPropsChange = props => {
    this.updateResult(this.state.code, props);
  }

  render() {
    const { beauty, props, precss, warnings, syntaxError, code } = this.state;

    if (code === null) {
      return null;
    }

    return (
      <Box className="flex column" fit>
        <Box className="top-menu">
          <TopMenu />
        </Box>
        <Box className="flex flex-grow responsive-row">
          <Box className="flex column flex-grow flex-50">
            <Box className="configuration-block">
              <ClassNameConfigurator
                error={this.state.classNameFunctionError}
                value={this.state.classNameFunction}
                onChange={this.handleConfigChange} />
            </Box>
            <Box className="flex flex-grow">
              <CodeMirror value={code} onChange={this.handleOnChange}/>
            </Box>
            <Box>
              {
                warnings.validateCSSRule.map((message, i) => {
                  return <ErrorBox isWarning={true} key={i} error={message} />
                })
              }
              {
                warnings.vendorPrefix.map((message, i) => {
                  return <ErrorBox isWarning={true} key={i} error={message} />
                })
              }
              <ErrorBox error={syntaxError} />
            </Box>
          </Box>
          <Box column className="flex flex-grow flex-50">
            <PropsEditor props={props} onChange={this.handleOnPropsChange} />
            <Tabs precss={precss} css={beauty} />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default App;
