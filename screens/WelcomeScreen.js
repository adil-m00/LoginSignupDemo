import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {fetchData} from '../Util/data';

function WelcomeScreen() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function getData() {
      const expenses = await fetchData();
      console.log('expenses', expenses);
      setOrders(expenses);
    }
    getData();
  }, []);

  function renderExpenseItem(itemData) {
    console.log("itemData",itemData)
    return (
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {itemData.item.name}
          </Text>
          <Text style={styles.textBase}>{itemData.item.date}</Text>
          <Text style={styles.textBase}>Order Status :{itemData.item.orderStatus}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.amount}>RM: {itemData.item.amount}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>

      <FlatList
        data={orders}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
    expenseItem:{
      flex:1,
        padding:12,
        marginVertical:8,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6,
        elevation:3,
        shadowColor:'gray',
        shadowRadius:4,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.4,
        minWidth:80,
    },
    textBase:{
        color:'black',
    },
    description:{
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold',

    },
    priceContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'white',

        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,

    },
    amount:{
        fontWeight:'bold',
        color:'black',
    }

});
