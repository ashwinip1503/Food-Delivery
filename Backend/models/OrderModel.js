import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'Food Processing' },
    date: { type: Date, default: Date.now }, // Using Date.now instead of Date.now()
    payment: { type: Boolean, default: false }
});

const orderModel = mongoose.model('order', orderSchema); // Ensured proper naming of the model

export default orderModel;