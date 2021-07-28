<template>
        <div>    
            <!-- Information du user  -->
            <div class="blocuserpostinfos">
                <img class="img-user-post" :src="infos.imageUrl">
                <h3>De {{infos.firstname}} {{infos.lastname}} </h3>  
            </div>
        </div>
</template>


<script >
export default {
    name: "UserInfos",
    data() {
        return {
            firstname: "",
            lastname: "",
            infos: [],
        };
        
    },
    props: {
        postUserId: Number,
    },
    mounted() {
        
        let url = "http://localhost:3000/api/users/"+this.postUserId;
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.infos = data;
                console.log(this.comments)           
            })
            .catch(error => console.log(error))
    },
}
</script>

<style lang="css">

.blocuserpostinfos
{
    /*background-color: hotpink;*/
    width: auto;
    display: flex;
}
.blocuserpostinfos h3
{
    color: white;
}

/*.img-user-post {
    margin-right: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
    border: 2px solid;
    object-fit: cover;
}*/

.img-user-post {
  width: 80px;
  height: 80px;
  -webkit-border-radius: 120px;
  -moz-border-radius: 120px;
  border-radius: 120px;
  margin: 10px auto 10px auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-right: 20px;
}

</style>