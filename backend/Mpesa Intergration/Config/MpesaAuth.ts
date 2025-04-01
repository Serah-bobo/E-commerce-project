import dotenv from 'dotenv'
dotenv.config()//load env variables
const consumerKey=process.env.CONSUMER_KEY;
const consumerSecret=process.env.CONSUMER_SECRET;
 
 if (!consumerKey || !consumerSecret ) {
    throw new Error("Missing environment variables");
  }
//function to fetch the access token
export const getAccessToken = async():Promise<string> => {
    //buffer.from.toString converts a string to a buffer
    //the consumer key is concatenation with the secret key to a single string
    //base64 converts the buffer to a base64 encoded string for api Mpesa authentication
      const auth=Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
      try{
        const response=await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",{
            headers:{
                "Authorization":`Basic ${auth}`
            }
        })
        if(!response.ok){
            throw new Error("Failed to fetch access token")
        }
        const data=await response.json();
         return data.access_token;
        
      }catch(error){
        console.log("Failed to fetch access token",error)
        throw error;
      }
}

