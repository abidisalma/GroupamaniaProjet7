import axios from "axios";

////Declaration de variable api-url qui contient la var d'env (process.env.API_URL) que j'ai défini le fichier .env,
const API_URL = process.env.REACT_APP_BASE_URL;
//declaration variable token :stocker les tokens dans le localStorage( voir le contenu du localStorage dans la console de votre navigateur)
const token = localStorage.getItem("token");

//ajouter le header a la requete - preciser le type des donnee
const headersFiles = {
	headers: {
		Accept: "application/json",
		Authorization: "Bearer " + token
	}
};

//fonction pour executer l'api login
const getAll = () => {
	return axios.get(API_URL + "/api/posts", headersFiles);
};

const getOne = id => {
	return axios.get(API_URL + "/api/posts/" + id, headersFiles);
};

//fonction pour executer l'api login
const create = data => {
	return axios.post(API_URL + "/api/posts", data, headersFiles);
};

const update = (data, id) => {
	return axios.put(API_URL + "/api/posts/" + id, data, headersFiles);
};

const like = (data, id) => {
	return axios.post(API_URL + "/api/posts/" + id + "/like", data, headersFiles);
};
// //fonction pour executer l'api login
const deletepost = id => {
	return axios.delete(API_URL + "/api/posts/" + id, headersFiles);
};

const Post = {
	getAll,
	getOne,
	create,
	deletepost,
	update,
	like
};
export default Post;
