module.exports.setRateReview = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'setRating');
        request.input('uid', db.NVarChar(50), req.body.uid);
        request.input('pid', db.NVarChar(50), req.body.pid);
        request.input('rating', db.NVarChar(50), req.body.rating);
        request.input('description', db.NVarChar(50), req.body.description);
        request.execute('prcratingreview', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Something went wrong! Please try wait."
                })
            } else if (results.rowsAffected == 0) {
                res.send({
                    "status": "0",
                    "message": "Error in sendting rating"
                })
            } else {
                res.send({
                    "status": "1",
                    "message": "feed back send successfully!"
                })
            }
        });
    });
};


module.exports.getRateReview = (req,res) =>{
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'getUserReview');
        request.input('uid', db.NVarChar(50), req.body.uid);
        request.input('pid', db.NVarChar(50), req.body.pid);
        request.execute('prcratingreview', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Something went wrong! Please try wait.",
                    "data":{}
                })
            } else if (results.recordset == 0) {
                res.send({
                    "status": "0",
                    "message": "not rateing.",
                    "data":{}
                })
            } else {
                res.send({
                    "status": "1",
                    "message": "Rating Review",
                    "data":results.recordset[0]
                })
            }
        });
    });
}

module.exports.getProductReviews = (req,res) =>{
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'getProductReviews');
        request.input('pid', db.NVarChar(50), req.body.pid);
        request.execute('prcratingreview', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Something went wrong! Please try wait.",
                    "data":{}
                })
            } else if (results.recordset == 0) {
                res.send({
                    "status": "0",
                    "message": "no rating",
                    "data":{}
                })
            } else {
                res.send({
                    "status": "1",
                    "message": "Rating Review",
                    "data":results.recordset
                })
            }
        });
    });
}

module.exports.getProductReviewsCount = (req,res) =>{
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar(50), 'getProductReviewsCount');
        request.input('pid', db.NVarChar(50), req.body.pid);
        request.execute('prcratingreview', function (error, results) {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Something went wrong! Please try wait.",
                    "data":{}
                })
            } else if (results.recordset == 0) {
                res.send({
                    "status": "0",
                    "message": "no rating",
                    "data":{}
                })
            } else {
                res.send({
                    "status": "1",
                    "message": "Rating Review count",
                    "data":results.recordset[0]
                })
            }
        });
    });
}
