import mongoose from "mongoose"

async function connect(){
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Conectando ao banco de dados:", dbConnection.connection.name);
  } catch (error) {
    console.error("Conection error:" + error);
  }
}

export default connect