exports.productcount = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
       
        request.input('userid',db.NVarChar,req.body.userid);
        request.execute('productcount',(error,result)=>{
            console.log(error);
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
                        "data": Object.values(JSON.parse(result.recordset))
                    })
                }
            }
        });
    })
}