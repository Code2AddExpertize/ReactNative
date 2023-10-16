The Higher-Order Component (HOC) design pattern in React Native is a way to reuse component logic and share behavior between components. It involves creating a function that takes a component as input and returns a new component with extended functionality. Here's an example of using the HOC pattern in React Native to create a reusable loading spinner component:

```javascript
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
```

In this example:

- The `withLoading` function is a HOC that takes a component (`WrappedComponent`) as an argument and returns a new component (`WithLoading`) that can display a loading spinner while `loading` is `true`.

- Inside the `WithLoading` component, it checks the `loading` prop. If `loading` is `true`, it shows an `ActivityIndicator` (loading spinner); otherwise, it renders the `WrappedComponent`.

- The main component (`MyComponent`) is a simple component that you want to display with loading behavior.

- In the `App` component, we simulate a loading state using the `state` and `setTimeout`. We then render the `MyComponentWithLoading` component (the wrapped component) and pass the loading state as a prop.

The HOC pattern allows you to easily reuse loading behavior across multiple components without duplicating code. You can wrap any component you want to enhance with loading behavior using the `withLoading` HOC.