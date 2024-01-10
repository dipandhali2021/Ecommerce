import  mongoose  from "mongoose"
import { invalidateCacheProps } from "../types/types.js"
import { myCache } from "../app.js"
import { Product } from "../models/product.js"

export const connectDB = async () => {

    mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0", {
        dbName: "ecommerce",

    }).then((c) => console.log(`connected to ${c.connection.host}`))
    .catch((err) => console.log(err))
}


export const invalidateCache =async ({product,admin,order}:invalidateCacheProps) => {
    if(product){
        const productKeys:string[] = ["latest-product","categories","all-products"]
        const products = await Product.find({}).select("_id")
        products.forEach((i) => {
            productKeys.push(`product-${i._id}`)

        })
        myCache.del(productKeys)
    }
    if(order){}
    if(admin){}
}