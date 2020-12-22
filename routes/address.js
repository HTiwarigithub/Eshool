exports.addressList = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.input('MobileNo',db.NVarChar,req.body.MobileNo);
        request.execute('prcaddress',(error,result)=>{
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
                        "message":"no address",
                        "data":[]
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Address List",
                        "data":result.recordset
                    })
                }
            }
        });
    })
}

exports.addAddress = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('name',db.NVarChar,req.body.name);
        request.input('MobileNo',db.NVarChar,req.body.MobileNo);
        request.input('emialId',db.NVarChar,req.body.emailId);
        request.input('city',db.NVarChar,req.body.city);
        request.input('state',db.NVarChar,req.body.state);
        request.input('zipcode',db.NVarChar,req.body.zipcode);
        request.input('country',db.NVarChar,req.body.country);
        request.input('Address',db.NVarChar,req.body.Address);
        request.execute('prcaddress',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error Occured"
                })
            }
            else{
                if(result.rowsAffected == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"Error in adding address"
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Address added successfully"
                    })
                }
            }
        });
    })
}

exports.editAddress = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Update');
        request.input('name',db.NVarChar,req.body.name);
        request.input('MobileNo',db.NVarChar,req.body.MobileNo);
        request.input('emialId',db.NVarChar,req.body.emailId);
        request.input('city',db.NVarChar,req.body.city);
        request.input('state',db.NVarChar,req.body.state);
        request.input('zipcode',db.NVarChar,req.body.zipcode);
        request.input('country',db.NVarChar,req.body.country);
        request.input('Address',db.NVarChar,req.body.Address);
        request.input('id',db.NVarChar,req.body.id);
        request.execute('prcaddress',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error Occured"
                })
            }
            else{
                if(result.rowsAffected == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"Error in updating address"
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Address updated successfully"
                    })
                }
            }
        });
    })
}

exports.deleteAddress = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('id',db.NVarChar,req.body.id);
        request.execute('prcaddress',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error Occured"
                })
            }
            else{
                if(result.rowsAffected == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"Error in deleting address"
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Address deleted successfully"
                    })
                }
            }
        });
    })
}