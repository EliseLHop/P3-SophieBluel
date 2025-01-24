let seConnecter = document.getElementById("connect");
 seConnecter.addEventListener("click", (e) => {
    e.preventDefault();
    let userEmail =  document.getElementById("Email");
    let email = userEmail.value;
    console.log(email);
    let userPassword = document.getElementById("password");
    let password = userPassword.value;
    console.log(password);

    const donnees = {
        "email": email,
        "password": password
    }
    console.log(donnees)
    
    //email: sophie.bluel@test.tld
    //password: S0phie 

    async function getLogin(donnees) {
        const url = "http://localhost:5678/api/users/login";
        try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(donnees),
            });

            if (!response.ok) {
              if ([401, 402, 404].includes(response.status)) {
                alert ("Email ou mot de passe incorrect");

              } else { 
                throw new Error(`Response status: ${response.status}`);
              }
              return;
            }
            else {//**mettre en storage**//
              
              
              
              
              
              }
            

            const data = await response.json();
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('UserId', data.userId)
            console.log("Connexion réussie :", data);

            
            //alert("Connexion réussie !");
            
            // Redirection
            window.location.href = "index.html";
        
          } catch (error) {
            console.error(error.message);
          }
    }
    getLogin(donnees)
 })
