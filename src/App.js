import React from 'react';
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';
import Home from './pages/Home';
import Favourites from './pages/Favourites';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]); // выбор фаворитов 
  const [searchValue, setSearchValue] = React.useState(''); // поиск 
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


//   React.useEffect(() => {
//   fetch('https://62f16be025d9e8a2e7cc41f6.mockapi.io/items') // отправь запрос 
//   .then((res) =>{
//   return res.json(); // верни мне ответ в json
//   })
//   .then((json) => { // вытащи json из этой переменной
//     setItems(json); // и передай его в SetAnimals и дальше через map сделай render
//   });
// }, []);


React.useEffect(() => {
 //setIsLoading(true);
 async function fetchData(){ 
 const cartResponse= await axios.get('https://62f16be025d9e8a2e7cc41f6.mockapi.io/cart'); 
 const favouritesResponse= await axios.get('https://62f16be025d9e8a2e7cc41f6.mockapi.io/favourites');
 const itemsResponse= await axios.get('https://62f16be025d9e8a2e7cc41f6.mockapi.io/items');


  setIsLoading(false);
  setCartItems(cartResponse.data);
  setFavourites(favouritesResponse.data); 
  setItems(itemsResponse.data);
  }
  fetchData();
}, []);

 

const onAddToCart = (obj) =>{
  if(cartItems.find((item) => item.id === obj.id)){ // если в корзине нашёлся хотя бы один объект у которого точно такой id как у Obj.id
  axios.delete(`/cart/${obj.id}`)
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id))); // то замени state на след условия , если хотя бы в одном объекте в моем state есть Obj.id, который я сейчас нашёл , то его исключи 
  } else { 
  axios.post('https://62f16be025d9e8a2e7cc41f6.mockapi.io/cart' , obj);
  setCartItems((prev)=>[...prev,obj]); 
  } //setCartItems берёт все что есть в CartItems и в конец пушит новый obj
};





const onRemoveItem = (id) =>{
  try {
    axios.delete(`https://62f16be025d9e8a2e7cc41f6.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id))); 
  // возьми все предыдущие данные и отфильтруй самого себя , возьми item и проверь ,что item из твоего массива не равен перем id
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };




const onAddToFavourite = async (obj) =>{
  try{
  if(favourites.find(fav => Number(fav.id )=== Number(obj.id))){
    axios.delete(`https://62f16be025d9e8a2e7cc41f6.mockapi.io/favourites/${obj.id}`);
    // при выполнении запроса отправляй на api.favourite и отдавай этот obj
    setFavourites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
  }else{
    const {data} = await axios.post('https://62f16be025d9e8a2e7cc41f6.mockapi.io/favourites' , obj);
    setFavourites((prev)=> [...prev,data]);   // сохрани в state 
  } 
  }catch (error) {
    alert('Не удалось добать в фавориты');
  }
};






const onChangeSearchInput = (event) =>{ 
  setSearchValue (event.target.value);  
  };






const isItemAdded = (id) =>{
  return cartItems.some((obj) => Number(obj.id) === Number(id)); 
//если хотя бы 1 условие соответствует , то true \ если ничего не совпало false 
}


  return (
    <AppContext.Provider 
    value={{
      items,
      cartItems,
      favourites, 
      isItemAdded , 
      onAddToFavourite,
      setCartOpened, 
      setCartItems}}>
      <div className="wrapper clear">
      {cartOpened && 
      <Drawer items={cartItems} onClose={()=> setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart = {()=> setCartOpened(true)} />
      <Routes>
      <Route path="/" exact element={
      <Home 
      items={items} 
      cartItems={cartItems}
      searchValue={searchValue} 
      setSearchValue={setSearchValue} 
      onChangeSearchInput={onChangeSearchInput}
      onAddToFavourite={onAddToFavourite}
      onAddToCart={onAddToCart}
      isLoading={isLoading}/>   }/>

<Route path="/favourites" exact element={
      <Favourites /> }/>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
