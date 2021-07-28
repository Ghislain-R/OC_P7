<template>
     
        <div class="blocsignup">
           
            <h2>ESPACE DE CONNEXION AU FORUM GROUPOMANIA </h2>
            <img src="../assets/user-lock-solid.svg" alt="Silhouette d'une personne avec un cadena" class="img-logsign" />
            <form v-on:submit.prevent="login" id="form-login" >
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" class="form-control" required v-model="inputLogin.email"/>
              </div>
              <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password" class="form-control" required v-model="inputLogin.password"/>
              </div>   
              <button class="loginsignupbutton" type="submit" title="Me connecter" aria-label="Me connecter au forum">Valider</button>                                     
            </form> 
              
             <nav class="navlogsign"><p>Vous ne possédez pas encore de compte ? <router-link to="/signup">Inscrivez-vous ici !</router-link></p></nav>
        </div>  
</template>


<script>
export default {
    name: 'Login',
    data() {
        return {
            inputLogin: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            let loginDatas = {
                "email": this.inputLogin.email,
                "password": this.inputLogin.password
            }
            console.log(loginDatas)
            let url = "http://localhost:3000/api/auth/login"
            let options = {
                method: "POST",
                body: JSON.stringify(loginDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    if (res.userId && res.token) {
                        localStorage.setItem("userId", res.userId)
                        localStorage.setItem("token", res.token)
                        localStorage.setItem("isAdmin", res.userAdmin);
                        console.log(localStorage)
                        this.$router.push("postlist");
                        alert("Bienvenue sur le réseau Groupomania !");
                    } else {
                        alert("Votre email et/ou mot de passe est incorrect. Veuillez vérifier vos identifiants");
                    }
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style lang="css">
</style>