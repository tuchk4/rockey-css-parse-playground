import React, { Component } from 'react';
import createParser from './rockey-css-parse';
import stringify from './rockey-css-parse/stringify';
import Box from 'react-layout-components'

import cssbeautify from 'cssbeautify';

import Tabs from './Tabs';
import ErrorBox from './ErrorBox';
import CodeMirror from './CodeMirror';
import TopMenu from './TopMenu';
import ClassNameConfigurator from './ClassNameConfigurator';


let parse = createParser({});

const preapre = precess =>  precess.map(p => {
  const processed = {};
  processed.selector = p.selector;
  processed.styles = p.styles;
  processed.root = p.root;

  if (p.media) {
    processed.media = p.media;
  }

  return processed;
});

class App extends Component {

  state = {
    code: `Button {
  color: red;
}`,
    css: '',
    beauty: '',
    precss: null,
  }

  handleConfigChange = (e) => {
    const getClassName = eval('(name)=>`'+ e.target.value +'`')
    try {
      getClassName('zxc');
      parse = createParser({
        getClassName
      });

      let parsed = null;
      let css = null;
      let error = null;

      try {
        parsed = parse(this.state.code);
        css = stringify(parsed.precss);
      } catch (e) {
        error = e;
      }

      this.setState({
        error,
        precss: error ? null : preapre(parsed.precss),
        beauty: error ? null : cssbeautify(css)
      });
    } catch(e) {

    }
  }

  handleOnChange = code => {
    let parsed = null;
    let css = null;
    let error = null;

    try {
      parsed = parse(code);
      console.log(parsed.precss)
      css = stringify(parsed.precss);
    } catch (e) {
      error = e;
    }

    this.setState({
      code,
      css,
      error,
      precss: error ? null : preapre(parsed.precss),
      beauty: error ? null : cssbeautify(css)
    });
  }

  render() {
    const { beauty, error } = this.state;
    return (
      <Box className="flex column" fit>
        <Box className="top-menu">
          <TopMenu />
        </Box>
        <Box className="flex flex-grow responsive-row">
          <Box className="flex column flex-grow flex-50">
            <Box className="configuration-block">
              <ClassNameConfigurator value="a-${name}" onChange={this.handleConfigChange} />
            </Box>
            <Box className="flex flex-grow">
              <CodeMirror value={this.state.code} onChange={this.handleOnChange}/>
            </Box>
            <Box>
              <ErrorBox error={this.state.error} />
            </Box>
          </Box>
          <Box className="flex flex-grow flex-50">
            <Tabs precss={this.state.precss} css={this.state.beauty} />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default App;
