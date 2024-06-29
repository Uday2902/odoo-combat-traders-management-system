// src/components/Tasks.js

import React from 'react';

const Tasks = ({ filteredOrders }) => {
    return (
        <div style={styles.container}>
            <div style={styles.column}>
                <h3>Orders</h3>
                {filteredOrders.map(order => (
                    <div key={order._id} style={styles.task}>
                        <p>Order ID: {order._id}</p>
                        {/* Display other order details here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        border: '1px solid #ccc',
    },
    column: {
        flex: 1,
        margin: '0 10px',
    },
    task: {
        padding: '10px',
        backgroundColor: '#eee',
        border: '1px solid #ccc',
        marginBottom: '10px',
    }
};

export default Tasks;
