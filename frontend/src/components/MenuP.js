import { useNavigate } from "react-router-dom";

function MenuP() {
	// declaration de variable navigate // pour l'utiliser dans la navigation
	const navigate = useNavigate();

	return (
		<div className="menu">
			<ul>
				<li>
					<button onClick={() => navigate("/addpost")}>Ajouter post</button>
				</li>
				<li>
					<button onClick={() => navigate("/")}>List des posts</button>
				</li>
				<li>
					<button
						onClick={() => {
							localStorage.clear();
							navigate("/inscription");
						}}
					>
						Déconnecter
					</button>
				</li>
			</ul>
		</div>
	);
}

export default MenuP;
