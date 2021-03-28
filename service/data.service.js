let accountDetails= {
    1000: { accno: 1000, name: "kanappi", balance: 6000, password: "user1" },
    1001: { accno: 1001, name: "dybala", balance: 9000, password: "user2" },
    1002: { accno: 1002, name: "kuttappan", balance: 7000, password: "user3" },
    1003: { accno: 1003, name: "kuttappi", balance: 8000, password: "user4" },
    1004: { accno: 1004, name: "jinjin", balance: 61000, password: "user5" },
  }



const  register = (accno, password) => {

    console.log("register called");
    
    if (accno in accountDetails) {
    //   console.log("user exist log in");
    //   alert("please login")
     
      return{
          status:false,
          message:"user exist log in"
      } 

    }

    accountDetails[accno] = {
      accno,
      name: "new user",
      balance: 0,
      password
    }

    
    // alert("reg success")
    // console.log(this.accountDetails);
    // this.saveDetails()
    
    return {
        status:true,
        message:"registered suuc"
    }

  }

  module.exports=
  {
      register
  }