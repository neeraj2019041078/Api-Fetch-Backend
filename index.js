const express=require("express");
const https=require("https");
const app=express();
const Port=2000;
const apiUrl="https://fakestoreapi.com/products";
const fetchProd=(url)=>{
    return new Promise((resolve,reject)=>{
        const req=https.get(url,(response)=>{
            let data='';
            response.on('data',(chunk)=>{
                data+=chunk;
            })
            response.on('end',()=>{
                try{

                    const resp=JSON.parse(data);
                    resolve(resp)
                }
                catch(err){
                    console.log(err.message)
                }
            })

        })
        req.on('error',(err)=>[
            reject(new Error(err.message))
        ])
        
    })

}

fetchProd(apiUrl).then((data)=>{
    // console.log(data);
    if(data){
        const updatedData=data.slice(0,1);
        console.log(updatedData)
    }
}).catch((err)=>{
    console.log(err.message);
})
app.listen(Port,()=>{
    console.log(`Server Listen at ${Port}`)
})