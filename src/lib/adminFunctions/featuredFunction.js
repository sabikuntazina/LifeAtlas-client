'use server'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

//to Store the comment 
export const postFeaturedLesson=async(featuredLessonData)=>{
   const res= await fetch(`${BASE_URL}/featured/lessons` , {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        // ...await authHeader(),
      },
       body : JSON.stringify(featuredLessonData)
    })
    const data= await res.json();
    console.log(data)
    return data
    
}

export const getAllFeaturedLessons=async()=>{
   const res = await fetch(`${BASE_URL}/featured/lessons`,
      // {
      //   headers: await authHeader()
      // }
    );
    return res.json();
}