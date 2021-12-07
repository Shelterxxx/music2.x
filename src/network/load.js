import {throttle} from './debounce'
export  default {
    bind(el,binding,vnode){
        el.addEventListener('scroll',throttle(function(){
            if(el.scrollHeight-el.scrollTop==el.clientHeight) {
            binding.value()
            }
            
        },2000))
        console.log(el,binding,vnode)
       

    } ,
    // insert(el,binding,vnode){
    //     console.log(el,binding,vnode)
      

    // } 
    // ,
    // update(el,binding,vnode){
    //     console.log(el,binding,vnode)
      

    // } 
}