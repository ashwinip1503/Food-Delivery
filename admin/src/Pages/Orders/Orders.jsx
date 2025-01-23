import React from 'react';
import './Orders.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {Array.isArray(orders) && orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.item.map((item, idx) => {
                  if (idx === order.item.length - 1) {
                    return `${item.name} X ${item.quantity}`;  
                  } else {
                    return `${item.name} X ${item.quantity}, `;
                  }
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
