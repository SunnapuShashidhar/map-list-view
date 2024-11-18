import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TopTabs from './src/navigations/TopTabs';

const App = () => {
  return (
    <NavigationContainer>
      <TopTabs />
    </NavigationContainer>
  );
};

export default App;
