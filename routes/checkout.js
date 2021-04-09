exports.checkout = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        var orderid = Math.floor(Math.random() * 1000000000);
        request.input('Email',db.NVarChar,req.body.Email);
        request.input('addressId',db.NVarChar,req.body.addressId);
        request.input('address',db.NVarChar,req.body.address); 
        request.input('location',db.NVarChar,req.body.location);
        request.input('mobileno',db.NVarChar,req.body.mobileno);
        request.input('Name',db.NVarChar,req.body.Name);
        request.input('paymentmode',db.NVarChar,req.body.paymentmode);
        request.input('orderid',db.NVarChar,orderid);
        request.input('userid',db.NVarChar,req.body.userid);
        request.execute('orderdetails',(error,result)=>{
            if(error){
                res.send({
                    "status":"0",
                    "message":"Error Occured"
                })
            }else{
                if(result.rowsAffected == 0){
                    res.send({
                        "status":"0",
                        "message":"Error in Adding Address"
                    })
                }else{
                    res.send({
                        "status":"1",
                        "message":"Ordered Successfully"
                        
                    })
                }
            }
        });
    })
}

module.exports.OrderList = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.input('Customerid',db.NVarChar,req.body.Customerid)
        request.execute('OredrHistory',(error,result)=>{
            if(error){
                console.log("hbdfkhsbdvfbsd",error)
                res.send({
                    "status":"0",
                    "message":"Error occured",
                    "data":{}
                })
            }else{
                if(result.recordset == 0){
                    res.send({
                        "status":"0",
                        "message":"No Order List",
                        "data":{}
                    })
                }else{
                    res.send({
                        "status":"1",
                        "message":"Order List",
                        "data":result.recordsets
                    })
                }
            }
        })
    })
}