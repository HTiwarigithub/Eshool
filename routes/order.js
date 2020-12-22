exports.orderhistory = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.input('Customerid',db.NVarChar,req.body.Customerid)
        request.execute('OredrHistory',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error Occured",
                    "data":[]
                })
            }
            else{
                if(result.recordset == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"No Order History",
                        "data":[]
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Order History List",
                        "data":result.recordset
                    })
                }
            }
        });
    })
}
//roshan

exports.productcount = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        
        request.input('userid',db.NVarChar,req.body.userid)
        request.execute('productcount',(error,result)=>{
            
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error Occured",
                    "data":[]
                })
            }
            else{
                if(result.recordset == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"No Product Available",
                        "data":[]
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Product Available",
                        "data": Object.values(JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
                    })
                }
            }
        });
    })
}