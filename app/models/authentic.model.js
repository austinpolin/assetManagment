var db = require('../../config/mysql');
var dbFunc = require('../../config/db-function');
var md5 = require('md5');

var authenticModel = {
    authentic: authentic,
    signup: signup
}

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM userInfo WHERE email ='${authenticData.username}'`, (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                var passKey = md5(authenticData.password);
                if(passKey === rows[0].password){
                    let resp = {"userId": rows[0].id, "firstName": rows[0].firstName, "lastName": rows[0].lastName, "userType": rows[0].userType};
                    resolve(resp);
                }else{
                    reject({"success":false,"message":"password doesnot match"});
                }
                // bcrypt.compare(authenticData.password, rows[0].password, function (err, isMatch) {
                //     if (err) {
                //         reject(error);
                //     } else if (isMatch) {
                //         resolve(rows);
                //     }
                //     else {
                //         reject({"success":false,"message":"password doesnot match"});
                //     }
                // });

            }
        });
    });

}


function signup(user) {
    return new Promise((resolve, reject) => {

        console.log(md5(user.password));

        db.query("SELECT * FROM user WHERE username='"+user.username+"'", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length>0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"user already exist ! try with different user"});
            } else {
                db.query("INSERT INTO user(username,password)VALUES('" + user.username + "','" + md5(user.password) + "')", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else {
                        dbFunc.connectionRelease;
                        resolve(rows);
                    }
                });
            }
        });

        // bcrypt.genSalt(10, function (err, salt) {
        //     if (err) {
        //         return next(err);
        //     }


        //     bcrypt.hash(user.password, salt, function (err, hash) {
        //         if (err) {
        //             return next(err);
        //         }
        //         user.password = hash;
        //         db.query("SELECT * FROM user WHERE username='"+user.username+"'", (error, rows, fields) => {
        //             if (error) {
        //                 dbFunc.connectionRelease;
        //                 reject(error);
        //             } else if(rows.length>0) {
        //                 dbFunc.connectionRelease;
        //                 reject({"success":false,"message":"user already exist ! try with different user"});
        //             } else {
        //                 db.query("INSERT INTO user(username,password)VALUES('" + user.username + "','" + user.password + "')", (error, rows, fields) => {
        //                     if (error) {
        //                         dbFunc.connectionRelease;
        //                         reject(error);
        //                     } else {
        //                         dbFunc.connectionRelease;
        //                         resolve(rows);
        //                     }
        //                 });
        //             }
        //         });
        //     })

        // });

    });
}

module.exports = authenticModel;



