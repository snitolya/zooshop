import React from 'react';

import Card from '../components/Card';

function Home({
  items,
  searchValue ,
  setSearchValue , 
  onChangeSearchInput , 
  onAddToFavourite , 
  onAddToCart ,
  isLoading}){

    
  const renderItems = () =>{
    const filtredItems = items.filter((item) => 
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(10)] : filtredItems)
    // если загрузка идет создай 10 фэйковых элементов иначе отобрази все item
    .map((item , index)=>(
            <Card 
            key={index}
            onFavourite = {(obj) => onAddToFavourite (obj)} 
            onPlus={(obj) => onAddToCart(obj)} 
            // title={item.title}
            // price={item.price}
            // imageUrl={item.imageUrl}
            {...item}
            />
          ))
  }
  
  return(
        <div className="content p-40">
        {/* <img className="front" width={900} height={490} src="/img/animals/allanimals.jpg" alt="All"/>  */}
        <div className="d-flex align-center justify-between mb-40">
        <h1 > {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все животные'} </h1> 
          {/* // если есть searchValue , то только тогда выполнять вторую часть можно , если она null false underfined то тогда вторую часть не отображать*/}
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img 
              onClick={()=> setSearchValue('') } // очищение данных из поле поиска 
              className="clear cu-p" 
              src="/img/btn-remove.svg" 
              alt="Clear" />
              )}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {renderItems()}
        </div>
      </div>
    );
}

export default Home;