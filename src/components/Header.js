import React from 'react'
import {Link} from 'react-router-dom';
import AppContext from '../context';

function Header(props){

  const {cartItems} = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum,obj) => obj.price + sum , 0);

    return(
      <header className="d-flex justify-between align-center p-40">
       <Link to="/">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="logotype"/>
        <div>
          <h3 className="text-uppercase">DogMaya ZOO</h3>
          <p className="opacity-5">Лучший зоомагазин</p>
        </div>
      </div>
      </Link>

      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
          <span> {totalPrice} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favourites">
          <img width={18} height={18} src="/img/heart.svg" alt="Zakladki" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="User" />
        </li>
      </ul>
    </header>
  
    );

   
}

export default Header;