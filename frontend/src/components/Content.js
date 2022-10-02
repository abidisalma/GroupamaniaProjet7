import { useEffect, useState } from "react";
import Post from "../services/post.services";
import Posts from "./Posts";
// declaration de la fonction Content pour afficher la liste des posts
function Content() {
	// declaration d'un variable listpost
	// setListposts : fonction pour remplir le variable listpost
	const [listposts, setListposts] = useState([]);
	// declaration d'un variable count = 0
	// declaration de variable count utiliser dans useeffect pour executer la fonction une seule fois
	let count = 0;
	// connexion pour executer une fonction a chaque changement de statut de composant
	useEffect(() => {
		// executer la fonction getall (appel api pour recuperer tous les posts dans la base backend)
		Post.getAll()
			.then(response => {
				setListposts(response.data);
				console.log(response.data);
			})
			.catch();
	}, [count]);

	return (
		<div className="content">
			{/* verifier s'il existe un variable listpost et parcourir pour afficher les post */}
			{listposts &&
				listposts?.map((item, index) => {
					// appel d'un composant et passer deux variable
					return <Posts data={item} key={index} />;
				})}
		</div>
	);
}

export default Content;
