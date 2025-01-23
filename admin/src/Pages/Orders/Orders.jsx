import React from "react";
import "./Orders.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        if (Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          setOrders([response.data.data]);
        }
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId: orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {Array.isArray(orders) &&
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                {Array.isArray(order.items) && (
                  <p className="order-item-food">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x" + item.quantity;
                      } else {
                        return item.name + "x " + item.quantity + ",";
                      }
                    })}
                  </p>
                )}
                {order.address && (
                  <React.Fragment>
                    <p className="order-item-name">
                      {order.address.firstName + " " + order.address.lastName}
                    </p>
                    <div className="order-item-address">
                      <p>{order.address.street + ","}</p>
                      <p>
                        {order.address.city +
                          "," +
                          order.address.state +
                          "," +
                          order.address.country +
                          "," +
                          order.address.zipcode}
                      </p>
                    </div>
                    <p className="order.item.phone">{order.address.phone}</p>
                  </React.Fragment>
                )}
              </div>
              {order.items && <p>Items:{order.items.length}</p>}
              {order.amount && <p>${order.amount}</p>}
              <select
                value={order.status}
                onChange={(event) => statusHandler(event, order._id)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;