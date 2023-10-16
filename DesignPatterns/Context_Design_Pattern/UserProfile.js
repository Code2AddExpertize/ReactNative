// UserProfile.js
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { DataContext } from './DataContext';

const UserProfile = () => {
  const { data, dispatch } = useContext(DataContext);

  const updateData = () => {
    dispatch({ type: 'UPDATE_DATA', payload: { name: 'Alice', age: 25 } });
  };

  return (
    <View>
      <Text>User Profile</Text>
      <Text>Name: {data.name}</Text>
      <Text>Age: {data.age}</Text>
      <Button title="Update Profile" onPress={updateData} />
    </View>
  );
};

export default UserProfile;
