<template>

     <section>

          <div class="blocsignup">  

                <h2>POSTER UN MESSAGE</h2>

                <form id="form-signup" >
                    
                    <!--Champ texte du post-->
                    <div class="form-group">

                        <label for="content">Message</label>

                        <textarea type="text" id="content" name="content" rows="10" class="form-control" required v-model="inputMessage.content"></textarea>

                    </div>

                </form>
                
                <!--Bouton d'enregistrement du post-->
                <button v-on:click="sendMessage" class="loginsignupbutton" title="Envoyer le post" aria-label="Envoyer le post">Envoyer</button> 

                <!--Bouton de retour-->
                <button v-on:click="returnToPostList" class="loginsignupbutton" title="Retour au forum" aria-label="Retourner sur la page des posts">Retour</button>
          </div> 
            
     </section> 

</template>

<script>
export default {
    name: 'Post',

    data() {
        return {
            inputMessage: {
                content: "",
            },
            userId: "",
        }
    },

    /*Récupération du user ID de l'utilisateur*/
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        console.log(this.userId)
    },

    methods: {
        
        /*Création du message*/
        sendMessage() {
            if ((this.inputMessage.content == null) || (this.inputMessage.content.lenght == 0 || this.inputMessage.content.trim() == '' )){
                alert("Veuillez saisir un contenu pour votre post !")
            } 
            else
            {           
            
            let deliverMessage = {
                "content": this.inputMessage.content.trim(),
                "userId": this.userId
            }
            console.log(deliverMessage)
            let url = "http://localhost:3000/api/posts"
            let options = {
                method: "POST",
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
                        this.inputMessage = {}
                    } else {
                        window.location.reload()
                        alert("Votre post est en ligne !");
                    }
                })
                .then(this.$router.push("/postlist"))
                .catch(error => console.log(error))

            }
        },

        /*Routage vers la liste des posts*/
        returnToPostList() {
            this.$router.push("/postlist")
        },
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

a {
    text-decoration: none;
    font-size: 1em;
    color: black;
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