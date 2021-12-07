
 export function timex( time ){  
    let m ,s
       if(time>1000){
            m =parseInt(time/60000)
      s = Math.round(time/1000 % 60)
       }else{
              m =parseInt(time/60)
      s = Math.round(time % 60)
       }
   
       
 if(m<10){
   m='0'+m
 }
 if (s < 10) {
   s = "0" + s;
 }
 return `${m}:${s}`
       }