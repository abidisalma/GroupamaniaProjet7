import "../assets/css/globale.scss";
import Header from "../components/Header";
import logo from "../assets/logo/icon-left-font-monochrome-white.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../services/post.services";

function AddPost() {
	//declaration des variables use state
	const [values, setValues] = useState([]);
	const [error, setError] = useState([]);
	const [success, setSuccess] = useState([]);
	// declaration de variable navigate // pour l'utiliser dans la navigation
	const navigate = useNavigate();

	//recuperer 'id d'utilisateur a partir du localstorage
	let user = localStorage.getItem("userIds");

	// declarer la fonction onchange( a chaque changement dans les inputs)
	const handleChange = event => {
		setValues(values => ({
			...values, //variable qui contient les valeur de formulaire (append : ajouter nouveau)
			[event.target.name]: event.target.value //valeur a ajouter : nom_champ:valeur_champ
		}));
	};
	// declarer la fonction onchange( a chaque changement de file)
	const handleChange_file = event => {
		setValues(values => ({
			...values,
			[event.target.name]: event.target.files[0]
		}));
	};
	// fonction pour envoyer le formulaire
	const handleSubmit = () => {
		console.log(values);
		// formdata : type de donnée a envoyer contient file
		let formData = new FormData();
		// ajout des variable au formdata a envoyer
		formData.append("userId", user);
		formData.append("title", values.title);
		formData.append("description", values.description);
		formData.append("image", values.file);
		//appel de fonction pour executer l'api de creation dans service post
		Post.create(formData)
			.then(response => {
				setSuccess(response.data.message);
				navigate("/");
			})
			.catch();
	};
	return (
		<div className="App">
			<Header />

			<div className="form">
				<h2>Creer Post</h2>
				{/* pour afficher les message d'erreur */}
				<label className="error">{error}</label>
				{/* pour afficher les message de confirmation */}
				<label className="success">{success}</label>
				<div className="inputgroup">
					<label>Titre</label>
					<input type="text" name="title" onChange={handleChange}></input>
				</div>
				<div className="inputgroup">
					<label>Description</label>
					<input type="textarea" name="description" onChange={handleChange}></input>
				</div>
				<div className="inputgroup">
					<label>image</label>
					<input type="file" name="file" onChange={handleChange_file}></input>
				</div>
				<div className="inputgroup">
					<button onClick={handleSubmit}>Ajouter post</button>
				</div>
			</div>

			<footer>
				<img src={logo} />
			</footer>
		</div>
	);
}

export default AddPost;
