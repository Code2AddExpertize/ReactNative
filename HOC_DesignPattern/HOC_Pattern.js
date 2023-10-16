import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// Higher-Order Component (HOC) to wrap a component with loading behavior
const withLoading = (WrappedComponent) => {
  return class WithLoading extends Component {
    render() {
      const { loading, ...props } = this.props;

      if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }

      return <WrappedComponent {...props} />;
    }
  };
};

// Your main component
class MyComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello, this is your content!</Text>
      </View>
    );
  }
}

// Wrap your component with the withLoading HOC
const MyComponentWithLoading = withLoading(MyComponent);

// Usage in your app
export default class App extends Component {
  state = {
    loading: true, // Simulating loading state
  };

  componentDidMount() {
    // Simulate data loading (e.g., an API request)
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    return <MyComponentWithLoading loading={this.state.loading} />;
  }
}
