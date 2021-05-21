import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Storage from "../components/Storage";
import RNPickerSelect from "react-native-picker-select";
import { date, month, year, hours, min, sec } from "../components/TimeDate";
import { Text, TextInput, Title, Headline } from "react-native-paper";

export type Props = {
  route: any;

  navigation: any;
};

const NewTransactionScreen: React.FC<Props> = ({ route, navigation }) => {
  const id = route.params ? route.params.id : undefined;
  const [sum, setSum] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (!route.params) return;
    setCategory(route.params.category);
    setType(route.params.type);
    setSum(route.params.sum.toString());
    setTimestamp(route.timestamp);
  }, [route]);
  useEffect(() => {
    setTimestamp(
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    );
  });
  function handleQuantityChange(sum) {
    setSum(sum);
  }

  function handleCategoryChage(category) {
    setCategory(category);
  }

  function handleTypeChage(type) {
    setType(type);
  }

  async function handleButtonPress() {
    if (!sum.trim()) {
      alert("Molim vas unesite iznos");
      return;
    } else if (!category.trim()) {
      alert("Molim vas odaberite kategoriju");
      return;
    } else if (!type.trim()) {
      alert("Molim vas odaberite tip");
      return;
    } else {
      submitHandler();
      const listItem = { category, type, sum: parseInt(sum), timestamp };

      Storage.saveItem(listItem, id).then((response) =>
        navigation.navigate("Home", listItem)
      );
    }
  }

  const submitHandler = () => {
    //runs on submit and sets the state to nothing.

    setCategory(" ");
    setType(" ");
    setSum(" ");
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.title}> Nova Transakcija</Headline>
      <View style={styles.inputContainer}>
        <Title>Iznos Transakcije</Title>

        <TextInput
          style={styles.input}
          onChangeText={handleQuantityChange}
          keyboardType={"numeric"}
          clearButtonMode="always"
          value={sum.toString()}
        />

        <Title>
          {category ? `Moje Kategorije ${category}` : "Izaberite Kategoriju"}
        </Title>
        <RNPickerSelect
          onValueChange={(category) => setCategory(category)}
          useNativeAndroidPickerStyle={false}
          onChangeText={handleCategoryChage}
          items={[
            { label: "hrana", value: "hrana" },
            { label: "pice", value: "pice" },
            { label: "gorivo", value: "gorivo" },
            { label: "obuca", value: "obuca" },
            { label: "racuni", value: "racuni" },
            { label: "odeca", value: "odeca" },
          ]}
        />
        <Title>{type ? `Tip Transakcije ${type}` : "Izaberite Tip"}</Title>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          onChangeText={handleTypeChage}
          onValueChange={(type) => setType(type)}
          items={[
            { label: "prihod", value: "prihod" },
            { label: "rashod", value: "rashod" },
          ]}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Dodaj Transakciju</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default NewTransactionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#cacaca",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "stretch",
  },
  button: {
    marginTop: 20,
    height: 60,
    backgroundColor: "#0c0c0c",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
