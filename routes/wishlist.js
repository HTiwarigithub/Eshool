exports.addWishList = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request  =  new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('uid',db.NVarChar,req.body.uid);
        request.input('pid',db.NVarChar,req.body.pid);
        request.execute('prcWishList',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured"
                })
            }
            else{
                if(result.rowsAffected == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"error in adding product in wishlist"
                    })  
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Product added in wishlist successfully"
                    })
                }
            }
        });
    });
};


exports.wishlistProducts = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request  =  new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.input('uid',db.NVarChar,req.body.uid);
        request.execute('prcWishList',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured",
                    "data":[]
                })
            }
            else{
                if(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'] == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"no product in wishlist",
                        "data":[]
                    })  
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"wishlist",
                        "data":Object.values(JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
                    })
                }
            }
        });
    });
};


exports.deleteWishlistProduct = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request  =  new db.Request();
        request.input('ActionType',db.NVarChar,'Delete');
        request.input('uid',db.NVarChar,req.body.uid);
        request.input('wid',db.NVarChar,req.body.wid);
        request.execute('prcWishList',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured",
                    "data":[]
                })
            }
            else{
                if(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'] == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"no product in wishlist",
                        "data":[]
                    })  
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"wishlist",
                        "data":Object.values(JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
                    })
                }
            }
        });
    });
};