import { Send } from '../models/Send.js';

export const getSendAll = async (req, res) => {
    try {
        const sends = await Send.find({ send: req.sendId })
        return res.status(200).json({success: true, sends})
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }   
}

export const getSendId = async (req, res) => {
    try {
        const sendId = { _id: req.params.id, send: req.sendId }
        const send = await Send.findOne(sendId);
        return res.status(200).json({success: true, sends: send})
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const createSend = async (req, res) => {
    const { name, address, phone, text, clothes, car, mark, vegetable, rice, noodles, milk, egg, status } = req.body;
    try {
        const newSend = new Send({
            name,
            address,
            phone,
            text,
            clothes,
            car,
            mark,
            vegetable,
            rice,
            noodles,
            milk,
            egg,
            status: status || false,
            
        })
        await newSend.save()
        return res.status(200).json({success: true, message: 'tao thanh cong! ', sends: newSend})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const updateSend = async (req, res) => {
    const {  name, address, phone, text, clothes,car, mark, vegetable, rice, noodles, milk, egg, status } = req.body;
    try {
        let updateSend = {
            name,
            address,
            phone,
            text,
            car,
            clothes,
            mark,
            vegetable,
            rice,
            noodles,
            milk,
            egg,
            status: status
        }
        
        const SendUpdate = { _id: req.params.id, send: req.sendId }
        updateSend = await Send.findOneAndUpdate(SendUpdate, updateSend, {new: true})
    	
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const deleteSend = async (req, res) => {
    try {
        const deleteSend = { _id: req.params.id, send: req.sendId }
        const sendDelete = await Send.findOneAndDelete(deleteSend)
        return res.status(200).json({success: true, send: sendDelete})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const updateStatus = async (req, res) => {
    const { status } = req.body;
    try {
        let updateStatus = {
            status: status
        }
        const statusUpdate = { _id: req.params.id }
        updateStatus = await Send.findByIdAndUpdate(statusUpdate, updateStatus, { new: true })
        res.status(200).json({ success: true, message: 'Thanh Cong' })
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}