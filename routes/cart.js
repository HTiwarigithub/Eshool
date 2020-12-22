module.exports.addPackageCount = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var productid = req.body.productid;
        var Product_Name = req.body.Product_Name;
        var Images = req.body.Images;
        var userid = req.body.userid;
        var qty = req.body.qty;
        var Price = req.body.Price;
        var totalPrice = req.body.totalPrice;

            var request = new db.Request();
            request.input('ActionType', db.NVarChar(50), 'getCount');
            request.input('productid', db.NVarChar(255), productid);
            request.input('userid', db.NVarChar(255), userid);
            request.execute('prcCartApp', function (error, results) {
                if (error) {
                    console.log(error);
                    res.send({
                        "status": "0",
                        "message": "Error Ocurred"
                    })

                }
                else {
                    db.close();
                    db.connect(conn, () => {
                        console.log(results.recordsets)

                        var request1 = new db.Request();
                        if (results.recordsets[0].length == 0) {
                            console.log('insert')
                            request1.input('ActionType', db.NVarChar(50), 'Insert');
                            request1.input('productid', db.NVarChar(255), productid);
                            request1.input('Product_Name', db.NVarChar(255), Product_Name);
                            request1.input('userid', db.NVarChar(255), userid);
                            request1.input('Images', db.NVarChar(255), Images);
                            request1.input('qty', db.NVarChar(255), qty);
                            request1.input('Price', db.NVarChar(255), Price);
                            request1.input('totalPrice', db.NVarChar(255), totalPrice);
                            request1.execute('prcCartApp', function (error, results) {
                                if (error) {
                                    res.send({
                                        "status": "0",
                                        "message": "Error Ocurred"
                                    })

                                }
                                if (results == null) {
                                    res.send({
                                        "status": "0",
                                        "message": "Product count not inserted"
                                    })
                                }
                                else {
                                    res.send({
                                        "status": "1",
                                        "message": "Package count added Successfully"
                                    })
                                }
                            });
                        }
                        else {
                            console.log('update')
                            request1.input('ActionType', db.NVarChar(50), 'Update');
                            request1.input('productid', db.NVarChar(255), productid);
                            request1.input('qty', db.NVarChar(255), qty);
                            request1.input('userid', db.NVarChar(255), userid);
                            request1.input('totalPrice', db.NVarChar(255), totalPrice);
                            request1.execute('prcCartApp', function (error, data) {
                                if (error) {
                                    res.send({
                                        "status": "0",
                                        "message": "Error Ocurred"
                                    })

                                }
                                if (results == null) {
                                    res.send({
                                        "status": "0",
                                        "message": "Package count not updated"
                                    })
                                }
                                else {
                                    console.log("data", data)
                                    res.send({
                                        "status": "1",
                                        "message": "Package count updated Successfully"
                                    })
                                }
                            });
                        }
                    });
                }
            });
    });
};

module.exports.getCart = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var userid = req.body.userid;
            var request = new db.Request();
            request.input('ActionType', db.NVarChar(50), 'Select');
            request.input('userid', db.NVarChar(255), userid);
            request.execute('prcCartApp', function (error, results) {
                if (error) {
                    console.log(error);
                    res.send({
                        "status": "0",
                        "message": "Error Ocurred",
                        "data": []
                    })

                }
                else {
                    if (results.recordset == 0) {
                        res.send({
                            "status": "1",
                            "message": "Cart is blank",
                            "data": []
                        })
                    } else {
                        res.send({
                            "status": "1",
                            "message": "Cart",
                            "data": results.recordset
                        })
                    }

                }
            });
        
    });
};


module.exports.getCartCount = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var userid = req.body.userid;
            var request = new db.Request();
            request.input('ActionType', db.NVarChar(100), 'getCartCount');
            request.input('userid', db.NVarChar(255), userid);
            request.execute('prcCartApp', function (error, results) {
                if (error) {
                    res.send({
                        "status": "0",
                        "message": " error occured"
                    })
                }
                else {
                    if (results.recordset == 0) {
                        res.send({
                            "status": "0",
                            "message": " no Product in Cart !"
                        })
                    }
                    else {
                        res.send({
                            "status": "1",
                            "message": "Product in Cart ",
                            "data": Object.values(results.recordset[0])[0]
                        })
                    }
                }
            });
    });
};

module.exports.removeProductCart = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var Id = req.body.Id;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'RemoveProduct');
        request.input('Id', db.NVarChar, Id);
        request.execute('prcCartApp', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "oops error"
                })
            }
            else if (results.rowsAffected == 0) {
                res.send({
                    "status": "0",
                    "message": " product not removed from cart"
                })
            }
            else {
                res.send({
                    "status": "1",
                    "message": " product removed from cart"

                })
            }
        });
    });
};