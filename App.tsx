import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Navigator from './src/navigation/navigator';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" hidden />
      <SafeAreaView style={{flex: 1}}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
