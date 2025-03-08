
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


const callAPI = async (method, address, body) => {

    let endpoint = `${process.env.NEXT_PUBLIC_DEV}${address}`;

    let options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    };
  
    let data = await apiClient(endpoint, options);
  
    console.log(JSON.stringify(data));
  
    return data;
  };
  
  export { 
    callAPI,
    apiClient
  };