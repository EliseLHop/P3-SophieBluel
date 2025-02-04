

// Appel Api Projets
async function getWorks() {
    const url = "http://localhost:5678/api/works";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      const projet = document.querySelector(".gallery");
      const projetModale = document.querySelector(".projets-presents");
      projet.innerHTML = "";
      projetModale.innerHTML = "";
      for (let i = 0; i < json.length; i++) {
      setFigure(json[i]);
      setFigureModale(json[i]);
    }
    } catch (error) {
      console.error(error.message);
    }
  }
  getWorks();




function setFigure(data) {
    const figure = document.createElement("figure");
    //"figure" = element du DOM
    figure.setAttribute("data-idCategory",data.categoryId);
    figure.setAttribute("data-idProjet",data.id);
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title} >
                        <figcaption>${data.title}</figcaption>`;
// Fait apparaitre les projets
    document.querySelector(".gallery").append(figure);
}


// Appel Api Categories
async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    for (let i = 0; i < json.length; i++) {

      setFilter(json[i]);
      setCategoriesModale(json[i]);
    }
  } catch (error) {
    console.error(error.message);
  }
}
getCategories();


//Je crée mes filtres
function setFilter(data) {
  
  const div = document.createElement("div");
  div.setAttribute("data-idCategory",data.id);

  div.addEventListener("click", () => {
    const galleryItems = document.querySelectorAll(".gallery figure");
   
    galleryItems.forEach(item => {
      const itemCategory = item.getAttribute("data-idcategory");
        if (itemCategory !== data.id.toString()) {
        item.style.display = "none";
        } else {
        item.style.display = "block";
        }

      });
      
      let Gallery = document.querySelector(".gallery");
      console.log(Gallery);
 
  })
  div.innerHTML = data.name;
  //si balise existe alors append
  if (document.querySelector(".MesFiltres")) {
  document.querySelector(".MesFiltres").append(div);
  }
  
};

//Tous
let AllProject=document.getElementById("Tous");
  AllProject.addEventListener("click", () => {
    const galleryItems = document.querySelectorAll(".gallery figure");
   
    galleryItems.forEach(item => {     
        item.style.display = "block";
      });
  });
  
    

  
//********Passer en mode admin ******/

function modifyPageForAdmin() {

  const mainHeader = document.getElementById('main-header');
const adminHeader = document.createElement('header');
    adminHeader.id = 'admin-header';
    adminHeader.innerHTML = '<div class="admin-bar"><i class="fa-regular fa-pen-to-square" ></i> Mode édition</div>';
    
    mainHeader.parentNode.insertBefore(adminHeader, mainHeader);

const removeFilters = document.querySelector('.MesFiltres');
  removeFilters.remove()


var addRemoveHeader = document.createElement('a');
  addRemoveHeader.className = 'modifier';
  addRemoveHeader.innerHTML = '<i class="fa-regular fa-pen-to-square" ></i> Modifier ';
  

var projetsTitre = document.querySelector('.projets-titre');
projetsTitre.appendChild(addRemoveHeader);

var changeLogin = document.getElementById('login');
changeLogin.textContent = 'logout';
changeLogin.removeAttribute('href');

changeLogin.addEventListener('click', function () {
  sessionStorage.removeItem('token'); // Supprime le token
  sessionStorage.removeItem('id'); // Supprime l'id

  location.reload(); // Recharge la page
});

}

if (sessionStorage.getItem('token')) {
  modifyPageForAdmin();
}


//******La modale ******/

document.querySelector('.modifier').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'flex';
});

document.getElementById('closeGallery').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
});

// Gestionnaire pour la croix du formulaire d'ajout
document.getElementById('closeForm').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
  document.querySelector('.formulaire-ajout').style.display = 'none';
  document.querySelector('.galerie-photos').style.display = 'block';
});

window.addEventListener('click', function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});




function setFigureModale(data) {
// Crée un élément image
const figure = document.createElement("figure")
figure.classList.add("work")

  figure.setAttribute("data-idCategory",data.categoryId);
  figure.setAttribute("data-idProjet",data.id);
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
                      <i class="fa-solid fa-trash-can supprimer"></i>`;
// Fait apparaitre les projets
    document.querySelector(".projets-presents").append(figure);

    figure.querySelector(".supprimer").addEventListener("click", async function () {
      const url = "http://localhost:5678/api/works/" + data.id;
      try {

        const response = await fetch(url,{
          method:"DELETE",
          headers:{
            Authorization: "Bearer " + sessionStorage.getItem("token")
          }

        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        getWorks()
      } catch (error) {
        console.error(error.message);
      }
      // faire un fetch *delete project*
    });


}


// Sélectionner le bouton et l'élément à cacher
const button = document.getElementById('ajouter');
const backButton = document.querySelector('.back-arrow')
const galleryPhoto = document.querySelector('.galerie-photos');
const ajoutPhoto = document.querySelector('.formulaire-ajout');


ajoutPhoto.style.display = 'none';

// Définir la fonction pour basculer entre les sections
const toggleModalSections = (showGallery) => {
  galleryPhoto.style.display = showGallery ? 'block' : 'none';
  ajoutPhoto.style.display = showGallery ? 'none' : 'block';
};

// Gestionnaires d'événements
button.addEventListener('click', () => toggleModalSections(false)); // Affiche le formulaire d'ajout
backButton.addEventListener('click', () => toggleModalSections(true)); // Retour à la galerie



function setCategoriesModale(data) {
  
  // Crée un élément image
  const option = document.createElement("option")  

    option.innerHTML = data.name;
    option.setAttribute("value",data.id)
  // Fait apparaitre les projets
      document.querySelector(".mes-categories").append(option);
  
  
  }


//***mon bouton passe au vert */

  function checkForm() {
    const titre = document.getElementById("titre").value.trim();
    const photo = document.getElementById("ajouter-photo").files.length;
    const validerButton = document.getElementById("valider");
  
    if (titre.length >= 3 && photo > 0) {
        validerButton.disabled = false;  // Activer le bouton
        validerButton.style.backgroundColor = '#1D6154'; // Changer la couleur en vert
    } else {
        validerButton.disabled = true;  // Désactiver le bouton
        validerButton.style.backgroundColor = ''; // Remettre la couleur grise par défaut
    }
  }
  
  document.getElementById("titre").addEventListener("input", checkForm);
  
  document.getElementById("ajouter-photo").addEventListener("change", checkForm);
  
  






let preview = document.querySelector('.preview');
preview.style.display = 'none';
const fileInput = document.getElementById('ajouter-photo');
let photoForm = document.querySelector ('.upload-photo');
let newImage = document.getElementById ('previewImage');

window.onload = function() {
  fileInput.value = ''; // Vide le champ file input
  document.querySelector('.titre').value = '';
};


fileInput.addEventListener('change', () => {
  photoForm.style.display = 'none';
  preview.style.display = 'block';
  newImage.src = URL.createObjectURL(fileInput.files[0])
});


//Appel API Post Projet

async function postProject() {
  const url = "http://localhost:5678/api/works";

  const formData = new FormData();
  formData.append("title", titre.value);
  formData.append("category", mescategories.value);
  formData.append("image", document.getElementById('ajouter-photo').files[0]);

  try {
      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Authorization": "Bearer " + sessionStorage.getItem("token"),
          },
          body: formData,
      });

      if (!response.ok) {
          throw new Error(`Erreur lors de l'ajout du projet : ${response.status}`);
      }

      const json = await response.json(); 
      console.log(json);

      setFigure(json);
      setFigureModale(json);

    
  } catch (error) {
      console.error("Erreur :", error);
  }
}



document.getElementById("valider").addEventListener('click', async () => {
  try {
    await postProject();
    // Réinitialiser la modale seulement après succès
    modal.style.display = 'none';
    document.getElementById('ajouter-photo').value = '';
    document.getElementById('previewImage').src = '';
    preview.style.display = 'none';
    photoForm.style.display = 'block'; 
    titre.value = '';
    mescategories.value = '';
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
    alert("Impossible d'ajouter le projet. Veuillez réessayer.");
  }
});





