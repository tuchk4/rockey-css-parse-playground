import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import JSONTree from './JSONTree'
import CSSBeautyContainer from './CSSBeautyContainer';

const TabsContainer = ({ css, precss }) => {
  return (
    <Tabs>
     <TabList>
       <Tab>CSS</Tab>
       <Tab>PreCSS</Tab>
     </TabList>
     <TabPanel>
        <CSSBeautyContainer value={css} />
     </TabPanel>
     <TabPanel>
       <JSONTree data={precss} />
     </TabPanel>
   </Tabs>
  );
}

export default TabsContainer;
