<template>
    <div>
      {{textx}}
     
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
       console.log(this.textx)
    },
    props:['textx']

}
</script>