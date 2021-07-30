<template>

        <nav id="navbar">

            <div class="links">

                <router-link to="/post" title="Poster un message" class="routerlink"><img src="../assets/comment-dots-regular.svg" class= "navbar-img" alt="Crayon" ><div class="button-text">Poster un message</div></router-link>

                <router-link to="/account" title="Mon compte" class="routerlink"><img src="../assets/user-alt-solid.svg" class= "navbar-img" alt="Silhouette d'une personne"><div class="button-text">Mon compte</div></router-link>
                
                <router-link to="/" title="Se deconnecter" class="routerlink"><img @click="deconnect" src="../assets/sign-out-alt-solid.svg" class= "navbar-img" alt="Flèche vers la droite"><div class="button-text">Déconnexion</div></router-link>           
            
            </div>

        </nav>

</template>

<script>
export default {
    name: "Navigation",
    methods: {
        /*Routage déconnexion d'un utilisateur*/
        deconnect() {
            localStorage.clear();
            this.$router.push("/");
        }
    }
}
</script>

<style lang="css">

#navbar 
{
    text-align: center;
    align-self: center;
    width: 30%;  
    height: auto;
    border-radius: 5px;
    padding: 20px;
    box-shadow: inset 0px 0px 0px 6px white;
    background-color: rgb(240, 238, 238);
    margin-top: 30px;
    border: 1px solid;
}

.links {
    display: flex;
    justify-content: space-around;
}

#navbar i {
    font-size: 2.5em;
    color: white;
    padding: 0 5px 0 5px;
    margin-left: 5px;
}

.navbar-img {
    width: 50px;
    height: 50px;
}

.button-text{
    text-decoration: underline none;    
}

@media screen and (max-width: 1270px) {

    #navbar {
    width: 60%; 
    } 
}

@media screen and (max-width: 768px) {
	#navbar {
        height: auto;
        width: 70%;
        position: relative;
        left: 0;
    }

    .button-text{
        font-size: 0.9em;
    }

    .navbar-img{
        width: 30px;
        height: 30px;
    }
}

@media screen and (max-width: 450px) {

	#navbar {
        box-shadow: inset 0px 0px 0px 8px white;
    }

    #navbar i {
        font-size: 2em;
    }
}
</style>