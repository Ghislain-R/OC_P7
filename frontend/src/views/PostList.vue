<template>
     <section>
                
          <div class="bloctitle">

			<h1>BIENVENUE SUR LE FORUM DE DISCUSSION DE GROUPOMANIA</h1> 
            <p>{{this.userAccount.firstname+"  "+this.userAccount.lastname}}</p>

          </div> 

          <Navigation></Navigation>

          <ListOfPosts/>
     </section> 
</template>


<script>
import Navigation from '../components/Navigation'
import ListOfPosts from '../components/ListOfPosts'
export default {
    name: 'PostList',
    components: {
        Navigation,
        ListOfPosts
    },
        data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId"),
                firstname: "",
                lastname: "",
                createdAt: "",
            },
            inputAccount: {
                lastname: "",
                firstname: "",
            }
        }
        
    },
    beforemount(){
        window.location.reload()
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
            })
            .catch(error => console.log(error))
    },
}
</script>
  
<style lang="css">

.bloctitle {
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
  padding-bottom: 20px;
  border: 1px solid;
}

.bloctitle h1 {
  /*font-weight: ; background-color: rgb(75, 128, 128);
   padding-top:5px;
   padding-bottom: 5px;
   color: white;
   font-weight: 500;*/
   font-size: 1.6em;
}

@media screen and (max-width: 1270px) {
  .bloctitle {
      width: 80%; 
  }
}
@media screen and (max-width: 930px) {
  .bloctitle h1 {
      font-size: 1.2em; 
  }
    .bloctitle p {
      font-size: 0.9em; 
  }
}
@media screen and (max-width: 768px) {
  .bloctitle {
      width: 90%; 
  }
}


</style>