const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const port = 3001;
const app = express();
app.use(express.json())
app.use(cors())

const fullOrder = []

const checkOrderId = (request, response, next) => {
    const { id } = request.params

    const index = fullOrder.findIndex(order => order.id === id)

     if(index<0) {
        return response.status(404).json({message: "Order not Found"})
    }

    request.orderIndex = index
    request.orderID = id

    next()
}

app.get('/order', (request, response) => response.json(fullOrder))



app.post('/order', (request, response) => {
    const {order, name} = request.body
    const contentOrder = {id: uuid.v4(), order, name}
    fullOrder.push(contentOrder)
    return response.json(fullOrder)
})


app.delete('/order/:id', checkOrderId, (request, response) => {
    const index = request.orderIndex;
    fullOrder.splice(index, 1);
    return response.status(201).json({message:"Order Deleted"});
})

app.listen(port, () => {
    console.log(`🦊🦊🦝🦝Server started on port ${port}`)
})