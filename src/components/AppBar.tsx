import React from "react";
import { Appbar } from "react-native-paper";
 import { UserContext } from "../Context/AuthContext";
  


const HomeHeader = ({
  navigation,
 
 

  
}) => {
     const { setUser } = React.useContext(UserContext);
  return (
    <Appbar.Header>
      <Appbar.Content />

      <Appbar.Action
        icon="plus"
        onPress={() => navigation.navigate("MyModal")}
      />
    
      <Appbar.Action icon="logout" onPress={() => setUser(null)} />
    </Appbar.Header>
  );
};

export default HomeHeader;
