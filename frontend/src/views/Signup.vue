<template>
     
          <div class="blocsignup">          
            <h2>FORMULAIRE D'INSCRIPTION</h2>
            <img src="../assets/user-plus-solid.svg" alt="Silhouette d'une personne avec le signe plus" class="img-logsign" />
            
            <form v-on:submit.prevent="signup" id="form-signup" >
              <div class="form-group">
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" class="form-control" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.lastname"/>
              </div>
              <div class="form-group">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" class="form-control" required 
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.firstname"/>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" class="form-control" required 
                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="inputSignup.email"/>
              </div>
              <div class="form-group">
                <label for="password">Mot de passe (*)</label>
                <input type="password" id="password" name="password" class="form-control" required
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="inputSignup.password"/>
              </div>  
              <p>(*) Votre mot de passe doit contenir 8 caractères minimum dont 1 majuscule, 1 minuscule et un chiffre</p>
              <button class="loginsignupbutton" title="Créer mon compte" aria-label="Créer mon compte">Valider</button>
                                                    
            </form> 
             
              <nav class="navlogsign"><p>Vous avez déjà un compte ? <router-link to="/">Connectez-vous</router-link></p></nav> 
          </div> 
</template>


<script>
export default {
    name: 'Signup',
    data() {
        return {
            inputSignup: {
                lastname: "",
                firstname: "",
                email: "",
                password: "",
                imageUrl: ""
            }
        }
    },
    methods: {
        signup() {
            this.inputSignup.imageUrl = "http://localhost:3000/images/picture_default.jpg"

            let inputDatas = {
                "lastname": this.inputSignup.lastname,
                "firstname": this.inputSignup.firstname,
                "email": this.inputSignup.email,
                "password": this.inputSignup.password,
                "imageUrl": this.inputSignup.imageUrl,
            }
            console.log(inputDatas)
            let url = "http://localhost:3000/api/auth/signup"
            let options = {
                method: "POST",
                body: JSON.stringify(inputDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(options)
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    /*if (res.userId && res.token){*/
                    localStorage.setItem("userId", res.userId);
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("isAdmin",res.userAdmin)
                    console.log(localStorage)
                    this.$router.push("/");
                    alert("Bienvenue sur Groupomania ! Vous pouvez dès à présent vous connecter !");
                  /*} */
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style lang="css">


form {
	margin-top: 25px;
}

.img-logsign {
  width: 50px;
  height: 50px;
}

/*button {
  border-style: none;
  border-radius: 5px;
  background-color: #FF79DA;
  text-decoration: none;
  padding: 12px;
  margin: 0 auto;
  background: linear-gradient(180deg, rgb(255, 63, 63), #d44c5c);
  color: white;
  font-size: medium;
  width: 150px;
  text-align: center;
  box-shadow: 0px 0 5px 1px #e0e0e0;
  margin-top: 10px;
}

button:hover {
  color: black;
  font-weight: bold;
  background: rgb(253, 153, 153);
}*/

.loginsignupbutton {
  border-style: none;
  border-radius: 5px;
  background-color: #FF79DA;
  text-decoration: none;
  padding: 12px;
  margin: 0 auto;
  background: linear-gradient(180deg, rgb(255, 63, 63), #d44c5c);
  color: white;
  font-size: medium;
  width: 220px;
  text-align: center;
  box-shadow: 0px 0 5px 1px #e0e0e0;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;

}

.loginsignupbutton:hover {
  color: black;
  font-weight: bold;
  background: rgb(253, 153, 153);
}
label {
  display: block;
  width: 25%; 
  text-align: right; 
  font-size: 1.2em;
  margin: auto;
  
}
input, textarea {
  width: 50%;
  height: 3em;
  box-sizing: border-box;  
  outline: none;
  padding: 10px;
  margin: auto;
  font-family: 'Roboto', sans-serif;
}
/*input:focus, textarea:focus {
  border-color: white;
  box-shadow: 0px 0px 20px #d44c5c;
}*/
input:focus, textarea:focus {
  border-color: black;
  border: 2px solid;
  /*box-shadow: 0px 0px 20px #d44c5c;*/
}
.form-group {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 15px;
  margin: auto;
 }
.blocsignup {
  color: black;
  margin: auto;
  width: 60%; 
	opacity: 0.95;
	padding-top: 20px;
	box-shadow: inset 0px 0px 0px 6px white;
  border-radius: 10px;
  text-align: center;
  margin-top: 20px;
  background-color: rgb(232, 248, 232);
  align-items: center;
  padding-bottom: 30px;
  border: 1px solid;
}

.blocsignup h2 {
  /*background-color: darkslategray;
  color: white;
  padding: 5px;*/
  font-weight: bold;
}

.blocsignup p {
	color: black;  
}
.navlogsign {
  height: 50px;
  width: 100%;
}
.navlogsign a {
  color: black;
  font-size: 0.75em;
}
.navlogsign a:hover, .navlogsign a:focus {
  color: #d44c5c;
}

@media screen and (max-width: 1270px) {
  .blocsignup {
      width: 90%; 
  }
}

@media screen and (max-width: 690px) {
  .blocsignup h2 {
    font-size: 1.2em; 
  }
  .form-group label {
    font-size: 0.95em;
  }
  #form-signup p {
    font-size: 0.8em ;
    margin-left: 8px;
    margin-right: 8px;
  }
  .navlogsign p {
    font-size: 0.8em;

  }
}
@media screen and (max-width: 450px) {
  .blocsignup {
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
}
</style>