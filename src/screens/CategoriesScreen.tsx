import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { Headline, Title } from "react-native-paper";
import HomeBar from "../components/AppBar";

import Storage from "../components/Storage";
export type Props = {
  route: any;
  items: any;
  item: any;
  acc: any;
  navigation: any;
};
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const CategoriesScreen: React.FC<Props> = ({ route, navigation }) => {
  const [items, setItems] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    Storage.getItems().then((items) => setItems(items));
  }, [route]);

  let totalTrosakGorivo = items
    .filter((item) => item.category == "gorivo")
    .reduce((acc, item) => acc + item.sum, 0);

  let totalTrosakRacuni = items
    .filter((item) => item.category == "racuni")
    .reduce((acc, item) => acc + item.sum, 0);

  let totalTrosakHrana = items
    .filter((item) => item.category == "hrana")
    .reduce((acc, item) => acc + item.sum, 0);

  let totalTrosakOdeca = items
    .filter((item) => item.category == "odeca")
    .reduce((acc, item) => acc + item.sum, 0);
  let totalTrosakObuca = items
    .filter((item) => item.category == "obuca")
    .reduce((acc, item) => acc + item.sum, 0);

  let totalTrosakPice = items
    .filter((item) => item.category == "pice")
    .reduce((acc, item) => acc + item.sum, 0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // { label: "hrana", value: "hrana" },
  //         { label: "pice", value: "pice" },
  //         { label: "gorivo", value: "gorivo" },
  //         { label: "obuca", value: "obuca" },
  //         { label: "racuni", value: "racuni" },
  //         { label: "odeca", value: "odeca" }

  // let filteredMachines = items
  //   .filter((item) => {
  //     switch (item.category) {
  //       case "gorivo":
  //         return item.category === "gorivo";
  //       case "racuni":
  //         return item.category === "racuni";
  //       case "hrana":
  //         return item.category === "hrana";
  //       case "odeca":
  //         return item.category === "odeca";
  //       case "obuca":
  //         return item.category === "obuca";
  //       case "pice":
  //         return item.category === "pice";
  //       default:
  //         return true;
  //     }
  //   })
  //   .reduce((acc, item) => acc + item.sum, 0);

  // console.log(filteredMachines);

  return (
    <>
      <HomeBar navigation={navigation} />
      <View style={styles.container}>
        <Headline style={styles.title}>Kategorije</Headline>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.scrollContainer}
          contentContainerStyle={styles.itemsContainer}
        >
          <Title>Ukupan Trosak za Gorivo : {totalTrosakGorivo}</Title>
          <Title>Ukupan Trosak za Racune : {totalTrosakRacuni}</Title>
          <Title>Ukupan Trosak za Hranu : {totalTrosakHrana}</Title>
          <Title>Ukupan Trosak za Odeca : {totalTrosakOdeca}</Title>
          <Title>Ukupan Trosak za Obuca : {totalTrosakObuca}</Title>
          <Title>Ukupan Trosak za Pice : {totalTrosakPice}</Title>
        </ScrollView>
      </View>
    </>
  );
};

export default CategoriesScreen;

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
  scrollContainer: {
    flex: 1,
    width: "90%",
  },
  itemsContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
});
