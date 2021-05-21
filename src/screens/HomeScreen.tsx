import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Text, Title, Headline } from "react-native-paper";
import { PieChart } from "react-native-svg-charts";

const { width, height } = Dimensions.get("window");
import Storage from "../components/Storage";
import { StatusBar } from "expo-status-bar";
import HomeBar from "../components/AppBar";

import { SafeAreaView } from "react-native-safe-area-context";
export type Props = {
  route: any;
  items: any;
  item: any;
  acc: any;
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ route, navigation, props }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleLoadMore();
  }, [route]);

  const handleLoadMore = () => {
    setLoading(true);
    const response = Storage.getItems().then((items) => setItems(items));
    setLoading(false);
    if (refreshing) setRefreshing(false);
    if (!response.ok) return setError(true);
    setError(false);
    if (page == 0) setItems(response);
    else setItems([...items, ...response]);
    setPage(page + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(0);
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          width: "100%",

          backgroundColor: "#C8C8C8",
          paddingTop: 1,
          paddingBottom: 1,
        }}
      />
    );
  };

  let totalPrihod = items
    .filter((item) => item.type == "prihod")
    .reduce((acc, item) => acc + item.sum, 0);

  let totalRashod = items
    .filter((item) => item.type == "rashod")
    .reduce((acc, item) => acc + item.sum, 0);

  let totalBudzet = items.reduce((acc, item) => acc + item.sum, 0);

  const datax = [
    {
      key: 1,
      amount: totalRashod,
      svg: { fill: "#685d6b" },
    },
    {
      key: 2,
      amount: totalPrihod,
      svg: { fill: "#963bb4" },
    },
    {
      key: 3,
      amount: totalBudzet,
      svg: { fill: "#100813" },
    },
  ];

  return (
    <>
      <HomeBar navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <PieChart
            style={{ height: 110, width: width, marginBottom: 20 }}
            valueAccessor={({ item }) => item.amount}
            data={datax}
            spacing={0}
            outerRadius={"95%"}
          ></PieChart>

          <Title style={styles.title}>Ukupan Prihod: {totalPrihod}</Title>
          <Title style={styles.title}>Ukupan Rashod: {totalRashod}</Title>
          <Title style={styles.title}>Ukupan Trosak: {totalBudzet}</Title>
          <Title style={styles.text}>Lista Transakcija</Title>
          {loading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
          <FlatList
            data={items}
            extraData={items.slice(page * 10)}
            onEndReachedThreshold={0.05}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            refreshing={refreshing}
            onEndReached={handleLoadMore}
            onRefresh={onRefresh}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({ item, index }) => (
              <View style={styles.flatlist}>
                <Title>Iznos: {item.sum}</Title>
                <Title>Tip Transakcije: {item.type}</Title>
                <Title>Vreme Transakcije: {item.timestamp}</Title>
                <Title>Kategorija Transakcije: {item.category}</Title>
              </View>
            )}
          />
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    width: width,
  },
  title: {
    marginTop: -10,
    marginBottom: 10,
  },
  text: {
    marginTop: 5,
    marginBottom: 15,
  },
  flatlist: {
    width: width,
    marginRight: 15,
    marginLeft: 15,
    paddingBottom: 10,
  },
});
