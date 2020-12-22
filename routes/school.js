exports.schoolList = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.query('SELECT * FROM brandmaster',(error,result)=>{
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
                        "message":"no school",
                        "data":[]
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"School List",
                        "data":result.recordset
                    })
                }
            }
        });
    })
}