import React, {useContext, useState} from 'react';
import classes from './Cart.module.css'
import iconImg from '../../asset/bag.png';
import CartContext from "../../store/cart-context";
import CartDetails from "./CartDetails/CartDetails";


const Cart = () => {

    const ctx = useContext(CartContext);

    // 添加一个state来设置详情是否显示
    const [showDetails, setShowDetails] = useState(false);

    // 添加一个显示详情页的函数
    const toggleDetailsHandler = () => {
      if(ctx.totalAmount === 0) return;
      setShowDetails(prevState => !prevState);
  };   

  return (  
    <div className={classes.Cart} onClick={toggleDetailsHandler}>

      {showDetails && <CartDetails/>}

        <div className={classes.Icon}>
            <img src={iconImg}/>
            {ctx.totalAmount === 0 ? null : <span className={classes.TotalAmount}>{ctx.totalAmount}</span>}
        </div>

        {ctx.totalPrice === 0 ? <p className={classes.NoMeal}>None products</p> : <p className={classes.Price}>{ctx.totalPrice}</p>}

        <button className={`${classes.Button} ${ctx.totalAmount === 0 ? classes.Disabled : '' }`}>checkout</button>
    </div>
  )
}

export default Cart;
