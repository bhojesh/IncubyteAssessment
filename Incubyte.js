import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-web";


const App = () => {
  const [data, setData] = useState("0");
  const onChangeText = (number) => {
    if (number.length == 0) return 0;
    const numbersArray = multiDelimiterCheck(number);
    const negativeNumbers = numbersArray.filter((num) => Number(num) < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(",")}`
      );
    }

    let numbers = numbersArray.map((num) => Number(num));
    numbers = ignoreNumbersAbove1000(numbers);
    return numbers.reduce((sum, num) => sum + num, 0);
  };
  const multiDelimiterCheck = (numbersString) => {
    let delimiter = /[\n,]/; // Default delimiter
    let numbers = numbersString.split(delimiter);

    // check for any custom delimiter
    if (numbers[0].includes("//")) {
      // get the delimiter
      delimiter = new RegExp(
        numbers[0].replace("//", "").replace(/\[|\]/g, "")
      );
      // delete the delimiters and create number array
      numbers = numbers[1].split(delimiter);
    }

    return numbers;
  };
  const ignoreNumbersAbove1000 = (numbers) => {
    return numbers.map((num) => (num >= 1000 ? 0 : num));
  };
  return (
    <View style={styles.app}>
      <Text style={styles.title}>OUTPUT : {data}</Text>
      <TextInput
        placeholder="Enter number"
        onChangeText={(text) => {
          let data = onChangeText(text);
          setData(data);
          console.log("OUTPUT", data);
        }}
        style={{
          borderColor: "black",
          borderWidth: 1,
          paddingVertical: 10,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    height: 80,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  link: {
    color: "#1B95E0",
  },
  code: {
    fontFamily: "monospace, monospace",
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 2,
  },
  text: {
    color: "#fff",
    fontWeight: "500",
    padding: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default App;
