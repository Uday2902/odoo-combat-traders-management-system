// frontend/src/pages/ExporterDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Profile from "./Profile";
import Tasks from "./Tasks";
import "./ExporterDashboard.css";
import NavBar from "./NavBar";

const ExporterDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("in-transit");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "http://localhost:5000/api/exporter/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log("response.data", response.data);

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);


  let filteredOrders = [];
  if (orders.length !== 0) {
    const statusToFilter = activeTab === "in-transit" ? ["in-transit", "available"] : ["completed"];
    filteredOrders = orders.filter((order) =>
      statusToFilter.includes(order.containerId.status) 
    );
  }

//   if (orders.length !== 0) {
//     const statusToFilter = activeTab === 'in-transit' ? ['in-transit', 'available'] : ['completed'];
//     filteredOrders = orders.filter(order => order.containerId.status in statusToFilter);
// }

  console.log("Filtered", filteredOrders);

  return (
    <div className="dashboard">
      <Header />
      <Profile />
      <div className="sections">
        <div className="tabs">
          <button
            className={activeTab === "in-transit" ? "active" : ""}
            onClick={() => setActiveTab("in-transit")}
          >
            In-Transit
          </button>
          <button
            className={activeTab === "completed" ? "active" : ""}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>
        <Tasks filteredOrders={filteredOrders} />
      </div>
    </div>
  );
};

export default ExporterDashboard;
