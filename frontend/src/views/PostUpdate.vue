<template>

     <section>

          <div class="blocsignup">   

            <h2>MODIFICATION DU MESSAGE</h2>

            <form id="form-signup" >

                <!--Champ texte du post-->
                <div class="form-group">

                    <label for="content">Message</label>

                    <textarea type="text" id="content" name="content" rows="10" class="form-control" required v-model="this.postData.content"></textarea>

                </div>

            </form>
            
            <!--Bouton d'enregistrement du post-->
            <button v-on:click="sendMessage" class="loginsignupbutton" title="Envoyer la modification" alt="Envoyer la modification du post">Modifier</button> 

            <!--Bouton de retour-->
            <button v-on:click="returnToPostList" class="loginsignupbutton" title="Retourner au forum" alt="Retourner sur la page des posts" >Retour</button>

           </div> 
            
     </section>

</template>

<script>
export default {
    name: 'PostUpdate',

    data() {
        return {
            postData: {
                postId: localStorage.getItem("postid"),
                content: ""
            },
            inputMessage: {
                content: "",
            },
            userId: "",
            postIdModify: localStorage.getItem("postid") 
        }
    },
    /*Affichage d'un post*/
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        console.log(this.userId)

        let url = "http://localhost:3000/api/posts/"+this.postData.postId;
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
                this.postData.postId = data.postId;               
            })
            .catch(error => console.log(error))


    },
    methods: {

        /*Modification du post*/
        sendMessage() {
            if ((this.postData.content == null) || (this.postData.content.lenght == '0' || this.postData.content.trim() == '' )) {
                alert("Veuillez saisir un contenu pour la modification du post !")
            } 
            else
            {         
    
            let deliverMessage = {
                "content": this.postData.content.trim()
            }
 
            let url = "http://localhost:3000/api/posts/"+this.postIdModify
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
                        localStorage.removeItem("postid");
                        window.location.reload()
                        alert("La modification du post est en ligne !");
                    }
                })
                .then(this.$router.push("/postlist"))
                .catch(error => console.log(error))

            }
        },

        /*Routage vers la liste des posts*/
        returnToPostList() {
            localStorage.removeItem("postid");
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