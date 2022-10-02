import { useNavigate } from "react-router-dom";

function Menu() {
	// declaration de variable navigate // pour l'utiliser dans la navigation
	const navigate = useNavigate();

	return (
		<>
			<div className="menu desktop">
				<ul>
					<li>
						<button onClick={() => navigate("/login")}>Se connecter</button>
					</li>
					<li>
						<button onClick={() => navigate("/inscription")}>S'inscrire</button>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Menu;
