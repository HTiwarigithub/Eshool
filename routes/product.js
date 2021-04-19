exports.productListBySchool = (req,res)=>{
    console.log("enter")
    db.close();
    db.connect(conn,()=>{
        console.log("enter")
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'productListBySchool')
        request.input('category',db.NVarChar,req.body.category)
        request.input('uid',db.NVarChar,req.body.uid)
        request.execute('prcRegisterApp',(error,result)=>{
            if(error){
                console.log("Error_block",error)
                res.send({
                    "status":"0",
                    "message":"Error Occured",
                    "data":[]
                })
            }else{
                if(result.recordset == 0){
                    console.log("result.recordset",result.recordset)
                    res.send({
                        "status":"0",
                        "message":"No product",
                        "data":[]
                    })
                }else{
                    console.log("result.recordset",result.recordset[0])
                    res.send({
                        "status":"1",
                        "message":"Product List",
                        "data":Object.values(JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
                    })
                }
            }
        });
    })
}

exports.productListByCategory = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'productListByCategory')
        request.input('category',db.NVarChar,req.body.category)
        request.input('uid',db.NVarChar,req.body.uid)
        request.execute('prcRegisterApp',(error,result)=>{
            if(error)
            {
                console.log(error)
                res.send({
                    "status":"0",
                    "message":"Error Occured",
                    "data":[]
                })
            }
            else{
                console.log(result)
                if(result.recordset == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"no product",
                        "data":[]
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Product List",
                        "data":Object.values(JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
                    })
                }
            }
        });
    })
}