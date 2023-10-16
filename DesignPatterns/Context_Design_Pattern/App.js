// App.js
import React from 'react';
import { View, Text } from 'react-native';
import { DataProvider } from './DataContext';
import UserProfile from './UserProfile';

const App = () => {
  return (
    <DataProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to React Native Context</Text>
        <UserProfile />
      </View>
    </DataProvider>
  );
};

export default App;
