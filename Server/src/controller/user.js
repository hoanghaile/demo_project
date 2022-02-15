import { Users } from '../models/User.js'

export const getUsers = async (req, res) => {
    // res.send('ROUTER SUCCESS');
    try {
        const users = await Users.find({ user: req.userId});
        // console.log('users', users);
        res.status(200).json({success: true, users})
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getUserId = async (req, res) => {
    try {     
        // const userId = { _id: req.params.id, user: req.userId}
        const user = await Users.findById(req.userId).exec();
        console.log(user);
        return res.status(200).json({ success: true, users:user });
    } catch (err) {
       console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }  
};

export const createUsers = async (req, res) => {
    const { fullname, phone, email, gender, address, passport, nationality, nation, position, work } = req.body;
    try {
        const newUser = new Users({
            fullname,
            phone,
            email,
            gender,
            address,
            passport,
            nationality,
            nation,
            position,
            work: work || true
        })
        await newUser.save()
        return res.status(200).json({success: true, message: 'tao thanh cong! ', users: newUser})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const updateUser = async (req, res) => {
    const { fullname, phone, email, gender, address, passport, nationality, nation, position, work } = req.body;
    try {
        let updateUser = {
            fullname, 
            phone,
            email,
            gender,
            address,
            passport,
            nationality,
            nation,
            position,
            work: work || true

        }
        const userUpdate = {_id: req.params.id, user: req.userId}
        updateUser = await Users.findOneAndUpdate(userUpdate, updateUser, { new: true })
        // if (!updateUser)
        //     return res.status(401).json({ success: false, message: 'post not found or user not auth' })
        // res.json({success: true , message: 'thanh cong', post: updateUser})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteUser = {_id: req.params.id, user: req.userId}
        const userDelete = await Users.findOneAndDelete( deleteUser )
        // if (!userDelete)
        //     return res.status(401).json({ success: false, message: 'xoa hong thanh cong' })
        return res.json({success: true , user: userDelete})
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const updateStatus = async (req, res) => {
    const { work } = req.body;
    try {
        let updateStatus = {
            work: work
        }
        const statusUpdate = { _id: req.params.id }
        updateStatus = await Users.findByIdAndUpdate(statusUpdate, updateStatus, { new: true })
        res.status(200).json({ success: true, message: 'Thanh Cong' })
    } catch (err) {
        console.log(err)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}