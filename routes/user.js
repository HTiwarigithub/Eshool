module.exports.signup = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        console.log(new Date());
        var address = req.body.address;
        var gender = req.body.gender;
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Insert');
        request.input('Name',db.NVarChar,req.body.name);
        request.input('Email',db.NVarChar,req.body.email);
        request.input('mobileno',db.NVarChar,req.body.mobile);
        request.input('password',db.NVarChar,req.body.password);
        request.input('address',db.NVarChar,address);
        request.input('gender',db.NVarChar,gender);
        request.input('otp',db.NVarChar,otp);
        // request.input('dnt',db.NVarChar,new Date());
        request.execute('prcRegisterApp',(error,result)=>{
            if(error)
            {
                console.log(error);
                res.send({
                    "status":"0",
                    "message":"Error occured"
                })
            }
            else
            {
                if(result.recordset[0].accRegistered == 'Already Registered')
                {
                    res.send({
                        "status":"0",
                        "message":"Already Registered"
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message": "Otp send to your Mobile " + otp
                    })
                }
            }
        })
    })
}
module.exports.login = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Select');
        request.input('value',db.NVarChar,req.body.value)
        request.input('password',db.NVarChar,req.body.password)
        request.execute('prcRegisterApp',(error,result)=>{
            if(error)
            {
                res.send({ 
                    "status":"0",
                    "message":"Error occured",
                    "data":{}
                })
            }
            else
            {
                if(result.recordset == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"error in login",
                        "data":{}
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Login successfully",
                        "data":result.recordset[0]
                    })
                }
            }
        })
    })
}
exports.otpAuth = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var otp = req.body.otp;
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'OtpAuth');
        request.input('otp', db.NVarChar, otp);
        request.execute('prcRegisterApp', (error, result) => {
            console.log(result)
            if (error) {
                res.send({
                    "status": "0",
                    "message": "error Occured",
                    "data": {}
                })
            }
            else {
                if (result.recordset == 0) {
                    res.send({
                        "status": "0",
                        "message": "Otp Incorrect",
                        "data": {}
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "User registered successfully",
                        "data": result.recordset[0]
                    })
                }
            }
        });
    });
};

exports.resendOtp = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var number = req.body.number;
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'resendOtp');
        request.input('mobileno', db.NVarChar, number);
        request.input('otp', db.NVarChar, otp);
        request.execute('prcRegisterApp', (error, result) => {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "error Occured"
                })
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Login error"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "New otp send to your Mobile " + otp
                    })
                }
            }
        });
    });
};

module.exports.forgetPasswordGetOtp = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var otp = Math.floor(Math.random() * Math.pow(10, 4)).toString().padStart(4, "0");
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'forgetPasswordOtp');
        request.input('value',db.NVarChar,req.body.value)
        request.input('otp',db.NVarChar,otp);
        request.execute('prcRegisterApp',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured"
                })
            }
            else
            {
                if(result.recordset == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"Incorrect details"
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Otp For Password change send to your Mobile " + otp
                    })
                }
            }
        })
    })
}

exports.forgetPassword = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'forgetPassword');
        request.input('password', db.NVarChar, req.body.password);
        request.input('otp', db.NVarChar, req.body.otp);
        request.execute('prcRegisterApp', (error, result) => {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "error Occured"
                })
            }
            else {
                if (result.rowsAffected == 0) {
                    res.send({
                        "status": "0",
                        "message": "Incorrect otp"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Your Password change successfully."
                    })
                }
            }
        });
    });
};


module.exports.updateProfile = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'Update');
        request.input('Name',db.NVarChar,req.body.name);
        request.input('Email',db.NVarChar,req.body.email);
        request.input('mobileno',db.NVarChar,req.body.mobile);
        request.input('id',db.NVarChar,req.body.id);
        request.input('address',db.NVarChar,req.body.address);
        // request.input('gender',db.NVarChar,req.body.gender);
        request.execute('prcRegisterApp',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured",
                    "data":{}
                })
            }
            else
            {
                if(result.rowsAffected == 0)
                {
                    res.send({
                        "status":"0",
                        "message":"error in updating profile",
                        "data":{}
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Profile updated successfully",
                        "data":result.recordset[0]
                    })
                }
            }
        })
    })
}

module.exports.changePassword = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.input('ActionType',db.NVarChar,'changePassword');
        request.input('oldpassword',db.NVarChar,req.body.oldpassword);
        request.input('password',db.NVarChar,req.body.password);
        request.input('id',db.NVarChar,req.body.id);
        request.execute('prcRegisterApp',(error,result)=>{
            if(error)
            {
                res.send({
                    "status":"0",
                    "message":"Error occured"
                })
            }
            else
            {
                console.log(result);
                if (result.recordset == undefined) {
                    res.send({
                        "status":"0",
                        "message":"Incorrect old password"
                    })
                }
                else{
                    res.send({
                        "status":"1",
                        "message":"Password changed successfully"
                    })
                }
            }
        })
    })
}

exports.checkRegistration = (req,res)=>{
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'phoneValidOrNot');
        request.input('mobileno', db.NVarChar, req.body.number);
        request.execute('prcRegisterApp', (error, result) => {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "error Occured"
                })
            }
            else {
                console.log(result);
                if (result.recordset[0].validPhone == 'Not valid') {
                    res.send({
                        "status": "0",
                        "message": "Incorrect detail"
                    })
                }
                else {
                    res.send({
                        "status": "1",
                        "message": "Correct detail"
                    })
                }
            }
        });
    });
};

module.exports.deceitSlashUser = (req,res)=>{
    db.close();
    db.connect(conn,()=>{
        var request = new db.Request();
        request.query('select * from crashApp',(error,result)=>{
            console.log(result)
            if(result.recordset == 0)
            {
                res.send({
                    "status":"0",
                    "data":{}
                })
            }
            else
            {
                res.send({
                    "status":"1",
                    "data":Object.values(result.recordset[0].value)[0]
                })
            }

        })
    })
}