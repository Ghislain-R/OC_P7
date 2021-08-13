<template>
        <div>    
            <!-- Répondre  -->
            <div class="blocanswer">
                <textarea type="text" id="content" name="content" rows="2" class="form-control" v-model="content" 
                placeholder="Saisissez votre commentaire..."></textarea>

                <button v-on:click="createComment()" class="actioncommentbutton" title="Envoyer le commentaire" aria-label="Envoyer le commentaire"><img src="../assets/paper-plane-solid.svg" alt="Avion en papier" ></button> 

            </div>

            <!-- Liste des réponses  -->
            <div  v-for="comment in comments" :key="comment.id" > 

                <UserCommentInfos :commentUserId="comment.userId" />    
                <div class="blocanswers" >

                    <div>
                        <p>Le {{formatDate(comment.createdAt)}}</p>  
                                                              
                        <p class="answercontent">{{ comment.content }} </p>    
                    </div> 
                </div>

                <div class="blocactions">

                    <!--Bouton de suppression d'un commentaire-->   
                    <button v-if="comment.userId == this.userId || isAdmin == true"
                     @click="deleteComment(comment.id)" class="actionbutton" ><img src="../assets/trash-alt-solid.svg" title="Supprimer le commentaire" aria-label="Supprimer le commentaire"></button>

                    <!--Bouton de modification d'un commentaire-->  
                    <button v-if="comment.userId == this.userId || isAdmin == true" 
                    @click="modifyComment(comment.id)" type="button" class="actionbutton"><img src="../assets/edit-solid.svg" title="Modifier le commentaire" aria-label="Modifier le commentaire"></button>
                        
                </div>      

            </div>

        </div>

</template>

<script >
import UserCommentInfos from "@/components/UserCommentInfos.vue";
export default {
    name: "Comments",
    components: {
        UserCommentInfos
    },
    data() {
        return {
            comment: "",
            comments: [],
            userId: ""
        };                
    },

    props: {
        postId: Number,
        postUserId: Number,
    },

    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
        console.log(localStorage);

        let url = "http://localhost:3000/api/comments/" + this.postId+"/display";
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
                this.comments = data;
                console.log(this.comments)
            })
            .catch(error => console.log(error))
    },

    methods: {

        /*Formatage de la date/heure*/
        formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('default', {dateStyle: 'full',timeStyle: 'short'}).format(date);
        },
        
        /*Création d'un commentaire*/
        createComment() {

            if ((this.content == null) || (this.content.lenght == 0 || this.content.trim() == ''))  {
               alert("Veuillez saisir un contenu pour votre commentaire")     
            }
            else
            {   

            let inputContent = {
                "postId": this.postId,
                "userId": this.userId,
                "content": this.content.trim()     
            }
                  
                let url = "http://localhost:3000/api/comments/"
                let options = {
                    method: "POST",
                    body: JSON.stringify(inputContent),
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                    .then(res => res.json())
                    .then((res) => {
                        console.log(res)
                        if (res.ok) {
                            this.content = {}
                        } else {
                            alert("Votre commentaire est en ligne !");
                        }
                    })
                    .then(window.location.reload())
                    .catch(error => console.log(error))  
            
            }             
                    
        },

        /*Suppression d'un commentaire*/
        deleteComment(commentid) {

            if (confirm("Confirmez-vous la supression du commentaire ?")) {               

                let url = "http://localhost:3000/api/comments/"+commentid ;
                let options = {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                };
                fetch(url, options)
                    .then((response) => {
                        console.log(response);
                        alert("Suppression du commentaire confirmée !");
                        window.location.reload();
                    })
                    .catch(error => console.log(error))

            }

        }, 

        modifyComment(commentid) {
        localStorage.setItem("commentid", commentid)
        this.$router.push("/commentupdate")
        }

    },
}
</script>

<style lang="css">

.answercontent {
    font-weight: bold;
    font-size: 0.83em;
}

.actioncommentbutton {
    border-style: none;
    border-radius: 5px;
    background-color: #FF79DA;
    text-decoration: none;
    padding: 12px;
    margin: 0 auto;
    background: linear-gradient(180deg, rgb(255, 63, 63), #d44c5c);
    color: white;
    font-size: medium;
    width: 50px;
    height: 50px;
    text-align: center;
    box-shadow: 0px 0 5px 1px #e0e0e0;
    margin-top: 10px;
    cursor: pointer;
}

.actioncommentbutton:hover{
    color: black;
    font-weight: bold;
    background: rgb(253, 153, 153);
}

.blocanswer {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.blocanswer a {
    width: 10%;
}

.blocanswers {
    text-align: center;
    width: 90%;
    margin: auto;
    margin-top: 10px;
    border-radius: 5px; 
    border: 1px solid grey;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.blocanswers i {
    color: #0c2444;
}

.blocanswer i {
    color: white;
    font-size: 1.75em;
    padding-right: 25px;
    text-shadow: -3px 0 3px #d44c5c, 0 3px 3px  #d44c5c, 3px 0 3px  #d44c5c, 0 -3px 15px  #d44c5c;
}

.blocanswer textarea:focus {
    border-color: white;
    box-shadow: 0px 0px 20px grey;
}

.blocactionscomment{
    background-color: yellow;
}

@media screen and (max-width: 760px) {

    .answercontent{
        font-size: 0.3em;   
    }

    .blocanswers p {
        font-size: 0.6em;
    }

    .actioncommentbutton {
        border-style: none;
        border-radius: 5px;
        background-color: #FF79DA;
        text-decoration: none;
        padding: 8px;
        margin: 0 auto;
        background: linear-gradient(180deg, rgb(255, 63, 63), #d44c5c);
        color: white;
        font-size: medium;
        width: 35px;
        height: 35px;
        text-align: center;
        box-shadow: 0px 0 5px 1px #e0e0e0;
        margin-top: 10px;
        cursor: pointer;
    }

}
</style>