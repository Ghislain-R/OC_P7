<template>

        <div>   

            <!-- Informations du user  -->
            <div class="blocusercommentinfos">

                <h3>{{infos.firstname}} {{infos.lastname}}</h3> 

            </div>

        </div>
        
</template>


<script >
export default {
    name: "UserCommentInfos",
    data() {
        return {
            firstname: "",
            lastname: "",
            infos: [],
        };        
    },
    props: {
        commentUserId: Number,
    },

    /*Affichage des informations de l'utilisateur*/
    mounted() {
        
        let url = "http://localhost:3000/api/users/"+this.commentUserId;
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

.blocusercommentinfos {
    text-align: center;
    font-size: 0.7em;
    background-color: gainsboro;
    width: 30%;
    margin: auto;
    height: 5%;
}

@media screen and (max-width: 930px) {

    .blocusercommentinfos {
        width: 60%;
    }
}    

@media screen and (max-width: 768px) {

    .blocusercommentinfos {
        font-size: 0.5em;
        margin-top: 10px;
        width: 60%;
    }
}

</style>