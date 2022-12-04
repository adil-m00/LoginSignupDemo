import axios from "axios";
const Backend_Url = "https://reactnativelearnings-default-rtdb.firebaseio.com"
export async function fetchData()
{
   const response =  await axios.get(Backend_Url+'/Orders.json');
   const expenses=[];
   console.log("responses",response)
   for(const key in response.data)
   {
       const expenseObj = {
           id:key,
           amount:response.data[key].amount,
           date:response.data[key].date,
           name:response.data[key].name,
           orderStatus:response.data[key].orderStatus,
       };
       expenses.push(expenseObj);
   }
   return expenses;
}