<template>
    <div style="transitionDuration:2s">
        <NavBar></NavBar>
        <h1>Timeline</h1>
    </div>
</template>
<script>
import NavBar from "../components/navHead";
export default {
     components:{NavBar},
     data() {
         return {
             headbgColor:'#f1f2f6'
         }
     },
}
</script>