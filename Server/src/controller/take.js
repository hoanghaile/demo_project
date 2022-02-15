import { Take } from '../models/Take.js';

export const getTakeAll = async (req, res) => {
    try {
        const takes = await Take.find({ take: req.takeId })
        return res.status(200).json({success: true, takes})
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }   
}

export const getTakeId = async (req, res) => {
    try {
        const takeId = { _id: req.params.id, take: req.takeId}
        const take = await Take.findOne(takeId);
        return res.status(200).json({success: true, takes: take})
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const createTake = async (req, res) => {
    const { name, address, phone, text, clothes, car, mark, vegetable, rice, noodles, milk, egg, status } = req.body;
    try {
        const newTake = new Take({
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
            status: status|| false,
            
        })
        await newTake.save()
        res.status(200).json({success: true, message: 'tao thanh cong! ', takes: newTake})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const updateTake = async (req, res) => {
    const { name, address, phone, text, car, mark, vegetable, rice, noodles, milk, egg, status } = req.body;
    try {
        let updateTake = {
            name,
            address,
            phone,
            text,
            car,
            mark,
            vegetable,
            rice,
            noodles,
            milk,
            egg,
            status: status,
        }
        const TakeUpdate = { _id: req.params.id, take: req.takeId }
        updateTake = await Take.findOneAndUpdate(TakeUpdate, updateTake, { new: true })
        
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const deleteTake = async (req, res) => {
    try {
        const deleteTake = { _id: req.params.id, take: req.takeId }
        const takeDelete = await Take.findOneAndDelete(deleteTake)
        return res.status(200).json({success: true, take: takeDelete})
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
        updateStatus = await Take.findByIdAndUpdate(statusUpdate, updateStatus, { new: true })
        res.status(200).json({ success: true, message: 'Thanh Cong' })
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}