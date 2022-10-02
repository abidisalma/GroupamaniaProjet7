// /importation fichier style
import "../assets/css/globale.scss";
// importation des composants
import Content from "../components/Content";
import Header from "../components/Header";
// importation images
import logo from "../assets/logo/icon-left-font-monochrome-white.png";

// declaration de fonction (pages)
function HomePage() {
	return (
		<div className="App">
			{/* afficher composant header */}
			<Header />
			{/* affichage de contenu */}
			<Content />
			{/* afficher le fouter */}
			<footer>
				<img src={logo} />
			</footer>
		</div>
	);
}

export default HomePage;
