import "server-only"; //Server to server only

const apiClient = async(url, options) => { //options parameter, body and all
  options.cache = "no-cache"; //always refreshes

  try {
      options.headers = {
        "Content-Type": "application/json"
      };
      let res = await fetch(url, options); //await is used to wait for a response before running the line
      
      let resObj = await res.json();
      resObj.code = res.status;
      
      return resObj;
 } catch (error) {

  return {
    code: 500,
    status: false,
    message: "error in API",
    data: [],
   };
  }
}

export{
  apiClient
};