import React, {useState} from 'react';
import Meals from "./Components/Meals/Meals";
import FilterMeals from "./Components/FilterMeals/FilterMeals";
import Cart from "./Components/Cart/Cart";
import CartContext from "./store/cart-context"
import Backdrop from './Components/UI/Backdrop/Backdrop';



// 模拟一组食物数据
const MEALS_DATA = [
    {
        id: '1',
        title: 'Cheeseburger',
        desc: 'Our legendary cheeseburger is a combo of 100% beef, onions, pickle, ketchup',
        price: 12,
        img: '/img/meals/1.png'
    },
    {
        id: '2',
        title: 'Double Cheeseburger',
        desc: 'Our legendary cheeseburger is a combo of 100% beef, onions, pickle, ketchup',
        price: 20,
        img: '/img/meals/2.png'
    },
    {
        id: '3',
        title: 'Big Mac',
        desc: 'Our legendary cheeseburger is a combo of 100% beef, onions, pickle, ketchup',
        price: 24,
        img: '/img/meals/3.png'
    }, {
        id: '4',
        title: 'McChicken',
        desc: 'Our legendary cheeseburger is a combo of 100% beef, onions, pickle, ketchup',
        price: 21,
        img: '/img/meals/4.png'
    }, {
        id: '5',
        title: 'McSpicy',
        desc: 'Our legendary cheeseburger is a combo of 100% beef, onions, pickle, ketchup',
        price: 18,
        img: '/img/meals/5.png'
    }, {
        id: '6',
        title: 'Filet-O-Fish',
        desc: 'Our legendary cheeseburger is a combo of 100% beef, onions, pickle, ketchup',
        price: 14,
        img: '/img/meals/6.png'
    }, {
        id: '7',
        title: 'Hamburger',
        desc: 'Our legendary cheeseburger is a combo of 100% beef, onions, pickle, ketchup',
        price: 12,
        img: '/img/meals/7.png'
    }
];

const App = () => {

    // 创建一个state用来存储食物列表
    const [mealsData, setMealsData] = useState(MEALS_DATA);

    // 创建一个state，用来存储购物车的数据
    /*
    *   1.商品 [] items
    *   2.商品总数（totalAmount）
    *   3.商品总价（totalPrice）
    * */
    const [cartData, setCartData] = useState({
        items: [],
        totalAmount: 0,
        totalPrice: 0
    });

        // 创建一个过滤meals的函数
        const filterHandler = (keyword) => {
            const newMealsData = MEALS_DATA.filter(item => item.title.indexOf(keyword) !== -1);
            setMealsData(newMealsData);
        };

        
        // 向购物车中添加商品
        const addItem = (meal) => {
        // meal 要添加进购物车的商品
        // 对购物车进行复制
        const newCart = {...cartData};

        // 判断购物车中是否存在该商品
        if (newCart.items.indexOf(meal) === -1) {
            // 将meal添加到购物车中
            newCart.items.push(meal);
            // 修改商品的数量
            meal.amount = 1;
        } else {
            // 增加商品的数量
            meal.amount += 1;
        }

        // 增加总数
        newCart.totalAmount += 1;
        // 增加总金额
        newCart.totalPrice += meal.price;

        // 重新设置购物车
        setCartData(newCart);
    };

    //减少商品的数量
    const removeItem = (meal) => {
        // 复制购物车
        const newCart = {...cartData};

        // 减少商品的数量
        meal.amount -= 1;

        // 检查商品数量是否归0
        if (meal.amount === 0) {
            // 从购物车中移除商品
            newCart.items.splice(newCart.items.indexOf(meal), 1);
        }

        // 修改商品总数和总金额
        newCart.totalAmount -= 1;
        newCart.totalPrice -= meal.price;

        setCartData(newCart);
    };


    return (
        <CartContext.Provider value={{...cartData, addItem, removeItem}}>
            <div>
                <Cart/>
                <FilterMeals onFilter={filterHandler}/>
                <Meals
                    mealsData={mealsData}
                />

            </div>
        </CartContext.Provider>
    );
};

export default App;
