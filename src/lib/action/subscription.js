    "use server"
    const baseUrl= process.env.NEXT_PUBLIC_SERVER_URL

 export const createSubscriptionData=async(subInfo)=>{
      const res= await fetch(`${baseUrl}/subscription` , {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
       body : JSON.stringify(subInfo)
    })
    const data= await res.json();
    // console.log(data)
    return data;
}