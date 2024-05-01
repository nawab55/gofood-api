const Order = require("../models/Orders");

const orderData = async (req, res) => {
    try {
        let data = req.body.order_data;
        await data.splice(0, 0, { Order_date: req.body.order_date });
        console.log("1231242343242354", req.body.email);

        // Check if email exists in the database
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);
        
        if (eId === null) {
            // Email does not exist, create a new order document
            console.log(data);
            console.log("1231242343242354", req.body.email);
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            // Email exists, update the existing order document
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error('Error during order data processing:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const myOrderData = async (req,res)=> {
    try {
        let myData = await Order.findOne({'email': req.body.email});
        res.status(200).json({orderData: myData})
        
    } catch (error) {
        console.error('Error during myOrder data processing:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

}

module.exports = {
    orderData,
    myOrderData
};





// const Order = require("../models/Orders");

// const orderData = async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0,0,{Order_date:req.body.order_date})
//     console.log("1231242343242354",req.body.email)

//     //if email not exisitng in db then create: else: InsertMany()
//     let eId = await Order.findOne({ 'email': req.body.email })    
//     console.log(eId)
//     if (eId===null) {
//         try {
//             console.log(data)
//             console.log("1231242343242354",req.body.email)
//             await Order.create({
//                 email: req.body.email,
//                 order_data:[data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({email:req.body.email},
//                 { $push:{order_data: data} }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
// }

// module.exports = {
//     orderData
// }