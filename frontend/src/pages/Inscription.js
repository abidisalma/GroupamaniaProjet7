import { useState } from "react";
import "../assets/css/globale.scss";
import logo from "../assets/logo/icon-left-font-monochrome-white.png";
import Header from "../components/Header";
import User from "../services/user.services";
import { useNavigate } from "react-router-dom";
function Inscription() {
	//un hook qui permet d'ajouter un state local dans un composant fonction
	//declaration de use state
	const [values, setValues] = useState([]);
	const [error, setError] = useState([]);
	const [success, setSuccess] = useState([]);
	// declaration de variable navigate // pour l'utiliser dans la navigation
	const navigate = useNavigate();
	// declarer la fonction onchange( a chaque changement dans les inputs)
	const handleChange = event => {
		setValues(values => ({
			...values, //variable qui contient les valeur de formulaire (append : ajouter nouveau)
			[event.target.name]: event.target.value //valeur a ajouter : nom_champ:valeur_champ
		}));
	};
	// declancher la fonction handleSubmit lorsque le formulaire est soumis.
	const handleSubmit = () => {
		console.log(values);
		//on appel au fonction inscription (dans service user)
		User.inscription(values)
			.then(val => {
				// on ajoute les (userid, tokenet role) à l'emplacement de stockage.
				localStorage.setItem("userIds", val.data.userId);
				localStorage.setItem("token", val.data.token);
				localStorage.setItem("role", val.data.role);
				//redirection vers la page content
				navigate("/");
			})
			.catch(err => {
				//On envoie une erreur au user si les informations de connexion sont erronées */
				setError(err?.response?.data);
			});
	};

	return (
		<div className="App">
			<Header />

			<div className="form">
				<h2>Inscription</h2>

				<label className="error">{error}</label>
				<label className="success">{success}</label>
				<div className="inputgroup">
					<label>Nom d'utilisateur</label>
					<input type="email" name="email" onChange={handleChange}></input>
				</div>
				<div className="inputgroup">
					<label>Mot de passe</label>
					<input type="password" name="password" onChange={handleChange}></input>
				</div>
				<div className="inputgroup">
					<button onClick={handleSubmit}>S'inscrire</button>
				</div>
			</div>

			<footer>
				<img src={logo} />
			</footer>
		</div>
	);
}

export default Inscription;
