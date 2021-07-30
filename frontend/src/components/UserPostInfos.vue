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

    /*Affichage des informations de l'utilisateur*/
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

.blocuserpostinfos {
    width: auto;
    display: flex;    
}

.blocuserpostinfos h3 {
    color: white;
}

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

@media screen and (max-width: 930px) {

    .img-user-post {
        width: 60px;
        height: 60px;
    }
}

@media screen and (max-width: 768px) {

    .img-user-post {
        width: 30px;
        height: 30px;
    }

    .blocuserpostinfos {
        width: min-content;
        display: flex;    
    }
}

</style>