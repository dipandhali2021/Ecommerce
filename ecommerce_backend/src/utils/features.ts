import  mongoose  from "mongoose"

export const connectDB = async () => {

    mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0", {
        dbName: "ecommerce",

    }).then((c) => console.log(`connected to ${c.connection.host}`))
    .catch((err) => console.log(err))
}