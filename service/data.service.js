const db = require('./db')

let accountDetails = {
  1000: { accno: 1000, name: "kanappi", balance: 6000, password: "user1" },
  1001: { accno: 1001, name: "dybala", balance: 9000, password: "user2" },
  1002: { accno: 1002, name: "kuttappan", balance: 7000, password: "user3" },
  1003: { accno: 1003, name: "kuttappi", balance: 8000, password: "user4" },
  1004: { accno: 1004, name: "jinjin", balance: 61000, password: "user5" },
}

let currentUser;



const register = (accno, password) => {

  console.log("register called");
  return db.User.findOne({ accno }).then(user => {
    console.log(user);
    if (user) {
      return {
        status: false,
        statusCode: 445,
        message: "user exist log in"
      }

    }

    else {
      const newUser = new db.User({
        accno,
        name: "new useer",
        balance: 0,
        password
      })

      newUser.save()

      return {
        status: true,
        statusCode: 200,
        message: "registered suuc"
      }
    }
  })




}

const login = (req, accno, pwd) => {

  accno = parseInt(accno);
  console.log("login");
  return db.User.findOne({ accno, password: pwd }).then(logi => {
    if (logi) {
      req.session.currentUser = logi;
      return {
        status: true,
        statusCode: 200,
        message: "log succ",
        name: logi.name,
        bal:logi.balance
      }
    }

    else {
      return {
        status: false,
        statusCode: 445,
        message: "invalid ac or pwd"

      }
    }
  })


}


deposit = (accno, pwd, amt) => {

  var ammt = parseInt(amt)
  return db.User.findOne({ accno: accno, password: pwd }).then(uss => {
    if (!uss) {
      return {
        status: false,
        statusCode: 455,
        message: "invalid acc or pwd"
      }
    }
    else {
      uss.balance += ammt;
      uss.save();
      return {
        status: true,
        statusCode: 455,
        message: "amt " +ammt+ " : credited, current balance : " + uss.balance
      }
    }
  })


}

withdraw = (accno, pwd, amt) => {
  var ammt = parseInt(amt)

  return db.User.findOne({ accno: accno, password: pwd }).then(uss => {
    if (!uss) {
      return {
        status: false,
        statusCode: 455,
        message: "invalid acc or pwd"
      }
    }
    else {
      if (uss.balance < ammt) {
        return {
          status: false,
          statusCode: 455,
          message: "no money"
        }

      }
      else {
        uss.balance -= ammt;
        uss.save();
        return {
          status: true,
          statusCode: 200,
          message: "amt " +ammt+ " : debited, current balance : " + uss.balance
        }

      }

    }
  })
}


module.exports =
{
  register, login, deposit, withdraw
}