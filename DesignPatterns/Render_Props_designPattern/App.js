import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

// A component that uses the Render Props pattern to fetch and display data
const DataFetcher = ({ render }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call to fetch data
    setTimeout(() => {
      const fetchedData = ["Item 1", "Item 2", "Item 3"];
      setData(fetchedData);
      setLoading(false);
    }, 2000);
  }, []);

  return render(data, loading);
};

// Your main component
const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <DataFetcher
        render={(data, loading) => (
          <View>
            {loading ? (
              <Text>Loading data...</Text>
            ) : (
              <View>
                <Text>Data:</Text>
                {data.map((item, index) => (
                  <Text key={index}>{item}</Text>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default App;
