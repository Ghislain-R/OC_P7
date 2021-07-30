<template>

     <section>
         
          <div class="blocsignup"> 

                <h2>MODIFICATION DU COMMENTAIRE</h2>

                <form id="form-signup" >
                    
                    <!--Champ texte commentaire-->
                    <div class="form-group">

                        <label for="content">Commentaire</label>
                        
                        <textarea type="text" id="content" name="content" rows="10" class="form-control" required v-model="this.postData.content"></textarea>

                    </div>

                </form>
                
                <!--Bouton de modification du commentaire-->
                <button v-on:click="sendMessage" class="loginsignupbutton" title="Envoyer la modification" aria-label="Envoyer la modification du commentaire" >Modifier</button> 

                <!--Bouton de retour-->
                <button v-on:click="returnToPostList" class="loginsignupbutton" title="Retourner au forum" aria-label="Retourner sur la page des posts" >Retour</button>
          </div> 
            
     </section> 

</template>

<script>
export default {
    name: 'CommentUpdate',

    data() {
        return {
            postData: {
                commentId: localStorage.getItem("commentid"),
                content: ""
            },
            inputMessage: {
                content: "",
            },
            userId: "",
            CommentIdModify: localStorage.getItem("commentid") 
        }
    },

    /*Affichage d'un commentaire*/
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        console.log(this.userId)

        let url = "http://localhost:3000/api/comments/"+this.postData.commentId;
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
                this.postData.content = data.content;
                this.postData.commentId = data.commentId;               
            })
            .catch(error => console.log(error))


    },
    methods: {

        /*Modification d'un commentaire*/
        sendMessage() {
            if ((this.postData.content == null) || (this.postData.content.lenght == '0' || this.postData.content.trim() == '' )){
                alert("Veuillez saisir un contenu pour la modification du commentaire !")
            } 
            else
            {         
    
            let deliverMessage = {
                "content": this.postData.content.trim()
            }
 
            let url = "http://localhost:3000/api/comments/"+this.CommentIdModify
            let options = {
                method: "PUT",
                body: JSON.stringify(deliverMessage),
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
                        window.location.reload();
                        this.postData = {}
                    } else {
                        localStorage.removeItem("commentid");
                        window.location.reload()
                        alert("La modification du commentaire est en ligne !");
                    }
                })
                .then(this.$router.push("/postlist"))
                .catch(error => console.log(error))

            }
        },

        /*Routage vers la liste des posts*/
        returnToPostList() {
            localStorage.removeItem("commentid");
            this.$router.push("/postlist")
        }


    }
}
</script>

<style lang="css">

section {
    display: flex;
    margin: auto;
    flex-direction: column;
}

.parametres {
    margin-top: 0;
    margin-bottom: 25px;
}

textarea {
    height: auto;
    resize:none;
}

@media screen and (max-width: 768px) {
	
    section {
        flex-direction: column;
        margin-top: 25px;
    }
}

</style>