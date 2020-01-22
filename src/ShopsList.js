import React, { useEffect, useState } from 'react';
import shopsAPI from './api/shops';

const defaultImg = 'https://thumbs.dreamstime.com/z/shop-building-colorful-isolated-white-33822015.jpg';
const ShopsList = () => {
  const [shops, setShops] = useState([]);
  const [keyword, onChangeInput] = useState('');
  const [timeout, setStateTimeout] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
    shopsAPI.get().then(data => setShops(data))
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // const onSearch = (value) => {
  //   onChangeInput(value);
  //   if (timeout) {
  //     clearTimeout(timeout);
  //   }
  //   const newTimeout = setTimeout(() => {
  //     shopsAPI.search(value).then(data => setShops(data))
  //   }, 500);
  //   setStateTimeout(newTimeout);
  // };
  return <div>
    {/*<div style={{ padding: '0 30px' }}>*/}
    {/*  <h4>Find a shop by name</h4>*/}
    {/*  <input value={keyword} type="text" onChange={(e) => onSearch(e.target.value)}/>*/}
    {/*</div>*/}
    {
      !(shops instanceof Array) ?
        <div>
          Disconnected
        </div>
        :
        <ul className="shops">
          {
            shops.map((shop, idx) => <li key={idx}>
              <div className="card">
                <div>
                  <img className="shop-image"
                       src={shop.image_url || defaultImg}
                       alt="Shop"
                       onError={(event) => event.target.setAttribute("src", defaultImg)}/>
                </div>
                <h3>{shop.name}</h3>
                <p>{shop.address}</p>
                <p>{shop.emp_nums}</p>
                <p
                  className={shop.isOpen ? 'status-open' : 'status-closed'}>{shop.isOpen ? 'Opening Now' : 'Closed'}</p>
              </div>
            </li>)
          }
        </ul>
    }
  </div>;
};

export default ShopsList;