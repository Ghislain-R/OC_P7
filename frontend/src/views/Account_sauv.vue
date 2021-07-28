<template>
     <section>

            <div class="blocsignup">
                <h2>Gestion du compte de {{ userAccount.firstname }} {{ userAccount.lastname }}</h2>
                <p>Vous êtes membre depuis le {{userAccount.createdAt}} </p>

            <!--<form v-on:submit.prevent="signup" id="form-signup" >-->
            <form  id="form-signup" >

              <div class="form-group">
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" class="form-control" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="this.userAccount.lastname"/>
              </div>
              <div class="form-group">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" class="form-control" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="this.userAccount.firstname"/>
              </div>

    
              <!--<div class="form-group">
                <label for="userid">Id</label>
                <input type="text" id="userid" name="userid" class="form-control" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="this.userAccount.userId"/>
              </div>-->
              <!--<div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" class="form-control" required 
                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="this.userAccount.email"/>
              </div>
              <div class="form-group">
                <label for="password">Mot de passe (*)</label>
                <input type="password" id="password" name="password" class="form-control" required
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="this.userAccount.password"/>
              </div>  -->
              <button v-on:click="modifyAccount" class="loginsignupbutton" title="Modifier mon compte" aria-label="Enregistrer les modifications de mon compte"> Valider</button>
                                                    
            </form>


                <button @click="deleteAccount" class="loginsignupbutton" title="Supprimer mon compte"  aria-label="Supprimer mon compte">Supprimer mon compte</button> 
                <button v-on:click="returnToPostList" class="loginsignupbutton" title="Retourner au forum" aria-label="Retourner sur la page des posts"  >Retour</button>   
            </div>  
     </section>
</template>

<script >

export default {
    name: 'Account',
    data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId"),
                firstname: "",
                lastname: "",
                createdAt: "",
                imageUrl: ""
            },
            inputAccount: {
                lastname: "",
                firstname: "",
            }
        }
        
    },
    mounted() {
        let url = "http://localhost:3000/api/users/"+this.userAccount.userId;
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
                this.userAccount.firstname = data.firstname;
                this.userAccount.lastname = data.lastname;               
                this.userAccount.email = data.email;
                this.userAccount.password = data.password;
                this.userAccount.createdAt = data.createdAt;
                this.userAccount.imagerUrl = data.imageUrl;
            })
            .catch(error => console.log(error))
    },
    methods: {
        /*formatDate(dateString) {
        const date = new Date(dateString);
        // Then specify how you want your dates to be formatted
        return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
        },*/

        getOneAccount() {
            let url = "http://localhost:3000/api/users/"+this.userAccount.userId;
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
                    this.userAccount.firstname = data.firstname;
                    this.userAccount.lastname = data.lastname;
                })
                .catch(error => console.log(error))
        },
        deleteAccount() {

            if (confirm("Confirmez-vous la supression du votre compte ? (Tous vos posts et commentaires seront également supprimés)")) {

                let url = "http://localhost:3000/api/users/"+ this.userAccount.userId;
                let options = {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then((response) => {
                        console.log(response);
                        localStorage.clear();
                        alert("Suppression du compte confirmée !");
                    })
                    .then(this.$router.push("/signup"))
                    .catch(error => console.log(error))
            }
        },
        modifyAccount() {
            
            if (this.userAccount.firstname == null || this.userAccount.lastname == null || this.userAccount.firstname.lenght == '0' || this.userAccount.lastname.lenght == '0' || this.userAccount.firstname.trim() == '' || this.userAccount.lastname.trim() == ''){
                alert("Veuillez saisir votre nom et prénom !")
                console.log("INFOS COMPTE "+this.inputAccount.firstname+"/"+this.inputAccount.lastname)
            } 
            else
            {         


                let userModif = {
                    "lastname": this.userAccount.lastname.trim(),
                    "firstname": this.userAccount.firstname.trim()
                }
                let url = "http://localhost:3000/api/users/"+ this.userAccount.userId;
                let options = {
                    method: "PUT",
                    body: JSON.stringify(userModif),
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        'Content-Type': 'application/json'
                    }
                };
                fetch(url, options)
                    .then((response) => {
                        console.log("XXXXXXX"+response)
                        alert("Modification du compte effectuée !");
                    })
                    .then(this.$router.push("/postlist"))
                    .catch(error => console.log(error))

            }

        },

        returnToPostList() {
            this.$router.push("/postlist")
        },
    },
} 
</script>

<style lang="css">
.accountbutton {
    width: auto;
    margin: 10px 10px 50px 10px;
}
</style>

<!--const storage = JSON.parse(localStorage.getItem('userConnect'));
        const userId = storage.userId
        let token = "Bearer " +  storage.token;

        const requestOptions = {
            method: 'put',
            headers: { 
                "Content-type" : 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(this.state)
        };

        fetch(('http://localhost:8080/api/users/' + userId), requestOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response.error) { 
                        alert("Votre compte n'a pas pu être modifié : " + response.error)
                    } else { 
                        this.setState({ redirection: true })
                    }
                })
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
    }-->