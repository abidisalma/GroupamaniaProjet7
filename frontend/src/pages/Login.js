import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/globale.scss";
import logo from "../assets/logo/icon-left-font-monochrome-white.png";
import Header from "../components/Header";
import User from "../services/user.services";
function Login() {
	//un hook qui permet d'ajouter un state local dans un composant fonction
	//declaration de use state
	const [values, setValues] = useState([]);
	const [error, setError] = useState([]);
	const [success, setSuccess] = useState([]);
	// declaration de variable navigate // pour l'utiliser dans la navigation
	const navigate = useNavigate();
	// on declarer la fonction onchange( a chaque changement dans les inputs)
	const handleChange = event => {
		setValues(values => ({
			...values, //variable qui contient les valeur de formulaire (append : ajouter nouveau)
			[event.target.name]: event.target.value //valeur a ajouter : nom_champ:valeur_champ
		}));
	};
	// on declancher la fonction handleSubmit lorsque le formulaire est soumis.
	const handleSubmit = () => {
		// on appel au fonction login (dans service user)
		User.login(values)
			.then(val => {
				console.log(val.data);
				//On envoie une confirmation au user si les informations de connexion sont correcte */
				setSuccess("Connexion réussi");
				// on ajoute les (userid, tokenet role) à l'emplacement de stockage
				localStorage.setItem("userIds", val.data.userId);
				localStorage.setItem("token", val.data.token);
				localStorage.setItem("role", val.data.role);
				//redirection vers la page content
				navigate("/");
			})
			.catch(err => {
				//On envoie une erreur au user si les informations de connexion sont erronées */
				setError(err.response.data);
				console.log(err.response.data);
			});
	};

	return (
		<div className="App">
			<Header />

			<div className="form">
				<h2>Se connecter</h2>
				<label className="error">{error}</label>
				<div className="inputgroup">
					<label>Nom d'utilisateur</label>
					<input type="email" name="email" onChange={handleChange}></input>
				</div>
				<div className="inputgroup">
					<label>Mot de passe</label>
					<input type="password" name="password" onChange={handleChange}></input>
				</div>
				<div className="inputgroup">
					<button onClick={handleSubmit}>Login</button>
				</div>
			</div>

			<footer>
				<img src={logo} />
			</footer>
		</div>
	);
}

export default Login;
