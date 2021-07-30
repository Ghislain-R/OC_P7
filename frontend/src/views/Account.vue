<template>
     <section>

            <div class="blocsignup">
                
                <h2>Gestion du compte de {{ userAccount.firstname }} {{ userAccount.lastname }}</h2>

                <form  id="form-signup" >

                    <!--Champ Nom-->
                    <div class="form-group">

                        <label for="lastname">Nom</label>
                        <input type="text" id="lastname" name="lastname" class="form-control" required 
                        pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="this.userAccount.lastname"/>

                    </div>

                    <!--Champ Prénom-->
                    <div class="form-group">

                        <label for="firstname">Prénom</label>
                        <input type="text" id="firstname" name="firstname" class="form-control" required 
                        pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="this.userAccount.firstname"/>

                    </div>

                    <!--Photo du profil-->
                    <div class= "avatar-profile"> 

                            <img class="avatar-img" :src="this.userAccount.imageUrl" />

                            <div class="avatar-modify">

                                <p>Modifier ma photo de profil </p>

                                <input v-on:change="updateAvatar" class="change-avatar-url" type="file" accept="image/*" />

                            </div>

                    </div>

                    <!--Bouton de modification du compte-->
                    <button v-on:click="modifyAccount" class="loginsignupbutton" title="Modifier mon compte" aria-label="Enregistrer les modifications de mon compte"> Valider</button>
                                                        
                </form>

                <!--Bouton de suppression du compte-->
                <button @click="deleteAccount" class="loginsignupbutton" title="Supprimer mon compte"  aria-label="Supprimer mon compte">Supprimer mon compte</button> 

                <!--Bouton de retour-->
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
                imageUrl: "", 
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
                this.userAccount.imageUrl = data.imageUrl;
                console.log("FICHIER : "+this.userAccount.imageUrl)
            })
            .catch(error => console.log(error))
    },
    methods: {

        /*Affichage d'un compte utilisateur*/
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
                    this.userAccount.imageUrl = data.imageUrl;
                })
                .catch(error => console.log(error))
        },

        /*Suppression d'un compte utilisateur*/
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

        /*Modification d'un compte utilisateur*/
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

        /*Routage vers la liste des posts*/
        returnToPostList() {
            this.$router.push("/postlist")
        },

        /*Modification de l'image de l'utilisateur*/
        updateAvatar(event) {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            let url = "http://localhost:3000/api/users/"+ this.userAccount.userId+"/image";
            let options = {
                method: "PUT",
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") },
                body: formData
            };
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    this.userAccount.imageUrl = data;
                })
                .then(() => {
                    window.location.reload()
                    alert("Votre photo de profil a bien été mise à jour");
                })
                .catch(error => console.log(error))
        },

    },
} 
</script>

<style lang="css">

.accountbutton {
    width: auto;
    margin: 10px 10px 50px 10px;
}

.avatar-img
{
    width: 100px;
    height: 100px;
}

.change-avatar-url{
    margin-left: auto;
    margin-right: auto; 
    width: auto;
    background-color: darkseagreen;
    border-radius: 5px;
}

.avatar-modify p {
    font-size: 0.9em;
    font-weight: bold;
}

.avatar-profile {
    border-radius: 5px;
    border: 2px solid;
    width: fit-content;
    margin: auto;
    padding: 10px;
    margin-bottom: 30px;
}

</style>

