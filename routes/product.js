exports.productListBySchool = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.query('select p.*,(select pi.* from productimages pi where pi.Productid = p.Id FOR JSON PATH) productImages,(select up.* from unitandprice up where up.ProductId = p.Id FOR JSON PATH) ProductUnitPrice, (SELECT rv.* FROM ratingreview rv WHERE rv.pid = p.Id FOR JSON PATH) ProductReviews from productmaster p where p.brandid = '+req.body.schoolId +'FOR JSON PATH',(error,result)=>{
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