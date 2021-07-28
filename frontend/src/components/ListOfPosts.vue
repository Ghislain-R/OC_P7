<template>
<div>

     <!-- Liste des messages -->   
      <div v-for="message in messages" :key="message.id" class="bloclist">
        
          <div class="blocauthor">
             <UserPostInfos :postUserId="message.userId"/>              
             <!--div class="blocjob">--> 
                  <p>Posté le {{formatDate(message.createdAt)}}  </p>
              <!--</div>-->
              <div class= "infolikes">
                <!--<p>Post liké {{message.likes}} fois </p>-->
                <p>{{message.likes}}</p>
                <img src="../assets/thumbs-up-solid.svg" title="Nombre de likes" class="imginfolikes" alt="Main avec un pouce vers le haut">
              </div>
          </div>
          <div class="blocmessage">
              <h5 class="pmessage"><i class="fas fa-angle-right"></i>  {{ message.content }} </h5>
          </div>  
          <div class="blocactions">
                <!--Bouton de suppression d'un post-->
                <button v-if="message.userId == userId || isAdmin == true" 
                type="button" @click="deleteMessage(message.id)" class= "actionbutton" title="Supprimer le post" aria-label="Supprimer le post" ><img src="../assets/trash-alt-solid.svg" alt="Poubelle"></button>

              <!--Bouton de modification d'un post-->
                <button v-if="message.userId == userId || isAdmin == true" 
                type="button" @click="modifyMessage(message.id)" class="actionbutton" title="Modifier le post" aria-label="Modifier le post"  ><img src="../assets/edit-solid.svg" alt="Crayon dans un cadre"></button>

              <!--Bouton de like-->
                <button v-if="message.userId != userId"
                type="button" @click="likeMessage(message.id)" id="like" class="actionbutton" title="Liker le post" aria-label="Aimer le post"  ><img src="../assets/thumbs-up-regular.svg" alt="Main avec un pousse levé"></button>
          </div>
       
          <Comment :postId="message.id" :postUserId="message.userId" />

      </div>

      <div v-if="noMessage" class="blocnomessage">
          <!--<NoMessage v-if="noMessage"></NoMessage>-->
        <p> Il n'y a aucun message à consulter pour le moment. Soyez le ou la première à lancer une discussion !</p>
        <router-link to="/post" title="Nouveau message" class="routerlink"><img src="../assets/new-message-icon-14.jpg" class= "navbar-img" alt="Bulle de discussion"><div class="button-text"></div></router-link>
        <!--comment-dots-regular.svg-->
      </div> 
        
  </div>

</template>


<!--<template>
<div>-->

     <!-- Liste des messages -->   
      <!--<div v-for="message in messages" :key="message.id" class="bloclist">
          <div class="blocauthor">
              <h3>Message de {{ firstname }} {{ lastname }} </h3>
              <div class="blocjob">  
                  <p>Posté le {{ message.createdAt }} </p>
              </div>
          </div>
          <div class="blocmessage">
              <div v-show="message.userId == userId || isAdmin == true" >
                <textarea type="text" id="content" name="content" rows="10" class="form-control" required></textarea>
              </div>
              <div v-show="message.userId != userId && isAdmin == false">
                <h5 class="pmessage"><i class="fas fa-angle-right"></i>  {{ message.content }} </h5>
              </div>
          </div>  
          <div class="blocactions">
                <button v-if="message.userId == userId || isAdmin == true" 
                type="button" @click="deleteMessage(message.id)" class="accountbutton">Supprimer le post </button>-->

              <!--Ajout bouton modification d'un post-->
                <!--<button v-if="message.userId == userId || isAdmin == true" 
                type="button" @click="modifyMessage(message.id)" class="accountbutton">Modifier le post </button>-->
          <!--</div>
       
        <Comment :postId="message.id" :postUserId="message.userId" />
      </div>   
  </div>

</template>-->

<script>
import Comment from "@/components/Comment.vue";
import UserPostInfos from "@/components/UserPostInfos.vue";
export default {
    name: "ListMessages",
    components: {
        Comment, UserPostInfos
    },
    data() {
        return {
            firstname: "",
            lastname: "",
            userId: "",
            isAdmin: "",
            messages: [],
            noMessage: false
        }

    },
    mounted() {    
    
        this.userId = JSON.parse(localStorage.getItem("userId"));
        this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
        console.log(localStorage);
        let url = "http://localhost:3000/api/posts";
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
                this.messages = data;
                if (this.messages.length === 0) { this.noMessage = true } else { this.noMessage = false }
                console.log(this.messages)
              
                
            })
            .catch(error => console.log(error))
         
    },
  
     
    methods: {
     
       formatDate(dateString) {
            const date = new Date(dateString);
                // Then specify how you want your dates to be formatted
            return new Intl.DateTimeFormat('default', {dateStyle: 'full',timeStyle: 'short'}).format(date);
        },
  

        ///////////////////DELETE MESSAGE/////////////////////
        deleteMessage(messageid) {

          if (confirm("Confirmez-vous la supression du post ?")) {

            let url = "http://localhost:3000/api/posts/"+messageid ;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    alert("Suppression du post confirmée !");
                    window.location.reload();
                })
                .catch(error => console.log(error))
          }

        },
        
        modifyMessage(messageid) {
          localStorage.setItem("postid", messageid)
          this.$router.push("/postupdate")

        },

        likeMessage(messageid) {
            let url = "http://localhost:3000/api/posts/like/"+messageid ;
            let options = {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    alert("Votre like du post est pris en compte !");
                    window.location.reload();
                })
                .catch(error => console.log(error))
        },



    },

}
</script>

<style lang="css">
/*.deletepostbutton
{
  background-image: url("../assets/trash-alt-solid.svg");
}*/

.blocnomessage
{
  /*background-color:darkseagreen ;*/
  width: 50%;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
}
.blocnomessage p {
  font-size: 1.2em;
  font-weight: bold;
  font-style: italic;
}


.infolikes{
  display: flex;
  align-items: center;
}
.imginfolikes{
  width: 25px;
  height: 25px;
  margin-left: 10px;
}

.actionbutton {
  border-style: none;
  border-radius: 5px;
  background-color: #FF79DA;
  text-decoration: none;
  padding: 12px;
  margin: 0 auto;
  background: linear-gradient(180deg, rgb(255, 63, 63), #d44c5c);
  color: white;
  font-size: medium;
  width: 40px;
  height: 40px;
  text-align: center;
  box-shadow: 0px 0 5px 1px #e0e0e0;
  margin-top: 10px;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
}

.actionbutton:hover {
  color: black;
  font-weight: bold;
  background: rgb(253, 153, 153);
}


.bloclist {
  width: 80%;
  margin: auto;
  margin-top: 25px;
  /*background-repeat: no-repeat;
  background-size: cover;*/
  border-radius: 10px; 
  padding: 25px;
  /*background-color: rgb(255, 255, 255);*/
  margin-bottom: 20px;
}
h4 {
  text-transform: uppercase;
  font-size: 1.25em;
  text-decoration: underline;
   
}
.blocjob {
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 50%;
  justify-content: space-around;
  
}
.blocauthor i {
  color: #0c2444;
  font-size: 1.75em;
  
}
.blocactions {
  width: 90%;
  margin: 0 auto;
  /*flex-direction: row;*/
}
.blocactions button {
  margin-bottom: 10px;
}
.blocauthor {
  width: 90%;
  background-color: rgb(255, 109, 109);
  margin: 0 auto;
  border-radius: 5px;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: white;
  margin-bottom: 5px;
}
.blocauthor h3 {
  font-size: 1.2em;
  margin: auto;
  /*padding-left: 15px;*/
  width: 100%;
  font-weight: 300;
}
.blocmessage {
  width: 90%;
  margin: 0 auto;
  border-radius: 5px; 
  border: 1px solid grey;
  box-sizing: content-box;
  text-align: center;
  /*background-color: rgb(240, 240, 240);*/
  /*background-color: rgb(232, 248, 232)*/
}
/*.blocmessage  h5 {
  font-style: italic;
}*/
h5 i, h4 i {
  font-size: 2em;
  color: #0c2444;
}

@media screen and (max-width: 1270px) {
	.bloclist {
    width: 90%; 
    /*box-shadow: inset 0px 0px 0px 8px white;
    border: 5px solid #d44c5c;
    font-size: 0.7em;*/
  }

  .blocauthor h3 {
  font-size: 0.9em;
  /*margin: auto;
  width: 100%;*/
}
.blocauthor p {
  font-size: 0.8em;
  /*margin: auto;
  width: 100%;*/
}

}
@media screen and (max-width: 760px) {
  .blocauthor h3 {
    font-size: 0.7em;
  /*margin: auto;
  width: 100%;*/
  }
  .blocauthor p {
  font-size: 0.6em;
  /*margin: auto;
  width: 100%;*/
  }

  .imginfolikes{
  width: 15px;
  height: 15px;
  margin-left: 10px;
}
 .blocnomessage p {
    font-size: 1em;
  }
}

@media screen and (max-width: 450px) {
	.bloclist {
    width: 90%; 
    box-shadow: inset 0px 0px 0px 8px white;
    border: 5px solid #d44c5c;
    font-size: 0.7em;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    
  }
  label, input, textarea {
    width: 75%;
    text-align: center;
  }
  .blocnomessage p {
    font-size: 1em;
  }


}
</style>