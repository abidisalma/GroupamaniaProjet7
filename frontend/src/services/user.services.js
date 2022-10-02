import axios from "axios";

//Declaration de variable api-url qui contient la var d'env (process.env.API_URL) que j'ai défini le fichier .env,
const API_URL = process.env.REACT_APP_BASE_URL;
//declaration variable token : On récupère les tokens depuis le localStorage ( voir le contenu du localStorage dans la console de votre navigateur)
const token = localStorage.getItem("token");

//ajouter le header a la requete - preciser le type des donnee
const headersFiles = {
	headers: {
		Accept: "application/json"
	}
};

//fonction pour executer l'api login
const login = data => {
	return axios.post(API_URL + "/api/auth/login", data, headersFiles);
};

//fonction pour executer l'api login
const inscription = data => {
	return axios.post(API_URL + "/api/auth/signup", data, headersFiles);
};

const User = {
	login,
	inscription
};
export default User;
