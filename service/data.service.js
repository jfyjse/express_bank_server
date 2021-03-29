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

  if (accno in accountDetails) {
    //   console.log("user exist log in");
    //   alert("please login")

    return {
      status: false,
      statusCode: 445,
      message: "user exist log in"
    }

  }

  accountDetails[accno] = {
    accno,
    name: "new useer",
    balance: 0,
    password
  }


  // alert("reg success")
  // console.log(this.accountDetails);
  // this.saveDetails()

  return {
    status: true,
    statusCode: 200,
    message: "registered suuc"
  }

}

const login = (req, accno, pwd) => {

  var data = accountDetails;

  if (accno in data) {
    var psw1 = data[accno].password;
    if (pwd == psw1) {

      // console.log("login success");
      // var userl = data[accno].name;
      req.session.currentUser = data[accno].name;
      // currentUser=userl;
      return {
        status: true,
        statusCode: 200,
        message: "login suuc"
      }


    }
    else {
      // console.log("inncorrect pswd");
      // return false;
      return {
        status: false,
        statusCode: 445,
        message: "pwd error"
      }


    }
  }
  else {
    //   console.log("no user account");
    //   return false;
    return {
      status: false,
      statusCode: 445,
      message: "no acc"
    }


  }
}


const deposit = (req, accno, pwd, amt) => {
  if (!req.session.currentUser) {
    return {
      status: false,
      statusCode: 441,
      message: "pls login"
    }

  }
  var ammt = parseInt(amt)
  var data = accountDetails;

  if (accno in data) {
    var psw1 = data[accno].password;
    if (pwd == psw1) {

      console.log("login success");
      data[accno].balance += ammt;


      // alert("acc credited wit :"+amt+" new bal= " + data[accno].balance) 
      return {
        status: true,
        statusCode: 200,
        message: "credited " + amt + " bal " + data[accno].balance
      }


    }
    else {
      // console.log("inncorrect pswd");
      return {
        status: false,
        statusCode: 445,
        message: "pwd err"
      }


    }
  }
  else {
    // console.log("no user account");
    return {
      status: false,
      statusCode: 445,
      message: "pwd err"
    }


  }

}

const withdraw = (accno, pwd, amt) => {
  var ammt = parseInt(amt)
  var data = accountDetails;

  if (accno in data) {
    var psw1 = data[accno].password;
    if (pwd == psw1) {

      // console.log("login success");
      if ((data[accno].balance) < ammt) {
        return {
          status: false,
          statusCode: 445,
          message: "no money"
        }
      }
      else {
        data[accno].balance -= ammt;
        // alert("acc debited wit :"+amt+" new bal= " + data[accno].balance);
        return {
          status: true,
          statusCode: 200,
          message: "debited " + amt + " bal " + data[accno].balance
        }
      }
    }
    else {
      // console.log("inncorrect pswd");
      return {
        status: false,
        statusCode: 445,
        message: "pwd err"
      }


    }
  }
  else {
    // console.log("no user account");
    return {
      status: false,
      statusCode: 445,
      message: "no accc"
    }


  }
}


module.exports =
{
  register, login, deposit, withdraw
}