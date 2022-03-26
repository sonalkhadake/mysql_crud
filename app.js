require('dotenv').config()
const express= require("express")
const app= express();
const { Sequelize,  DataTypes } = require('sequelize');
const PORT= process.env.PORT || 9091
console.log(process.env.PORT)
app.use(express.json());
// app.set('view engine', 'ejs')


const sequelize = new Sequelize(process.env.DATABASE, process.env.MYSQLUSERNAME, process.env.MYSQLPASSWORD, {
  host: 'localhost',
  dialect:'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


async function collection(){          // async function returns a promice
  // testing the database is connected or not
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return null;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return error;
  }
}
// creating a schema
const Assignment = sequelize.define("assignment", {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  }
 
);
// creating a static route for post request

// app.post("/api/create",async(req,res)=>{   
//     try{
//       const subject = await Assignment.create({ name: "Assignment 2", subject: "English" });

//       res.json({message:"Success",data:subject})
//     }
//     catch(err){

//       res.json({message:"Error",data:err})

//     }


// })
// create a route for get request
// app.get("/api/getAll",async(req,res)=>{

//   try{
//     const subject = await Assignment.findAll();
    

//     res.json({message:"Success",data:subject})
//   }
//   catch(err){

//     res.json({message:"Error",data:err})

//   }


// })


// creating a route for dynamic data

app.post("/api/create",async(req,res)=>{   
    try{
      const body= req.body
      const subject = await Assignment.create({ 
         name: body.name,
        subject: body.subject,
       });

      res.json({message:"Success",data:subject})
    }
    catch(err){

      res.json({message:"Error",data:err})

    }


})

// create a get request for dynamic data
app.get("/api/getAll",async(req,res)=>{

  try{
    const subject = await Assignment.findAll();
    

    res.json({message:"Success",data:subject})
  }
  catch(err){

    res.json({message:"Error",data:err})

  }


})
// updating qurery

// app.put("/api/update/:id", async(req,res)=>{
//   try{

//   const data =await Assignment.update({subject:"Hindi"},{
//     where:{
//       id:req.params.id
//     }
    
    

//   });
//   res.json({message:"success", data:data})

// }catch(err){

//   res.json({message:"Error",data:err})

// }
// })

// dynamically updating data
app.put("/api/update/:id", async(req,res)=>{
  try{
    const body= req.body

  const data =await Assignment.update({
    subject:body.subject,
    name:body.name
  },
    {
    where:{
      id:req.params.id
    }
    
    

  });
  res.json({message:"success", data:data})

}catch(err){

  res.json({message:"Error",data:err})

}
})
// creating a route for getting updated id
app.get("/api/getByID/:id", async(req,res)=>{

  try{
    const subject = await Assignment.findAll({
      where:{
        id:req.params.id
      }
    });
    

    res.json({message:"Success",data:subject})
  }
  catch(err){

    res.json({message:"Error",data:err})

  }


})
app.delete("/api/delete/:id",async(req,res)=>{

  try{
    const subject = await Assignment.destroy({
      where:{
        id:req.params.id
      }
    });
    

    res.json({message:"Success"})
  }
  catch(err){

    res.json({message:"Error",data:err})

  }


})







collection().then(err=>{
    if(!err){
        app.listen(PORT, ()=>{
            console.log("your server is running at port"+PORT)
        })
    } else{
        console.log(err)
    }
})
