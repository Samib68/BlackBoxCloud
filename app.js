
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCLCn_bsk3H9NQ4PdBNuXq-AmnXPr-an4E",
    authDomain: "projet-427ac.firebaseapp.com",
    databaseURL: "https://projet-427ac-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projet-427ac",
    storageBucket: "projet-427ac.appspot.com",
    messagingSenderId: "359257221154",
    appId: "1:359257221154:web:3eed9fdcddcfb831cfc27b",
    measurementId: "G-8WF9Q55H5R"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const blackDb = getDatabase(app);


export  function previewImage() {
  const fileInput = document.getElementById('fileInput');
  const imagePreview = document.getElementById('imagePreview');

  // Vérifiez si un fichier a été sélectionné
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Créez un élément d'image pour afficher la prévisualisation
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.width = '720px';

      // Effacez le contenu précédent de la div de prévisualisation
      imagePreview.innerHTML = '';

      // Ajoutez l'élément d'image à la div de prévisualisation
      imagePreview.appendChild(img);
    };

    // Lisez le fichier en tant que URL de données
    reader.readAsDataURL(fileInput.files[0]);
  }
}

export async function uploadImage() {
  const fileInput = document.getElementById('fileInput');
  const uploadedImage = fileInput.files[0];

  if (uploadedImage) {
    // Générez un nom de fichier unique pour éviter les conflits
    const fileName = Date.now() + '_' + uploadedImage.name;

    // Créez une référence à l'emplacement de stockage dans Firebase avec le nom de fichier généré
    const storageRef = ref(blackDb, 'images/' + fileName);

    try {
      // Chargez le fichier vers Firebase Storage
      const snapshot = await uploadBytes(storageRef, uploadedImage);

      console.log('Image uploaded successfully. Download URL:', snapshot.ref.getDownloadURL());
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  } else {
    console.warn('Aucune image sélectionnée.');
  }
}