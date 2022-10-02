import images from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";

// recuperer la variable data passé dans le composant parent
function Posts({ data }) {
	// declaration de variable navigate // pour l'utiliser dans la navigation
	const navigate = useNavigate();
	// si la poste ne contient pas une image afficher image par default
	let img = data?.imageUrl || images;
	return (
		<div
			className="post"
			onClick={() => {
				navigate("/posts/" + data._id);
			}}
			style={{ backgroundImage: `url(${img})` }}
		>
			<div className="bloctext">
				{/* afficher le titre de la post */}
				<h2 className="title">{data.title}</h2>
				<div className="description">{data.description}</div>
			</div>
		</div>
	);
}

export default Posts;
