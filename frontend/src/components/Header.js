import Menu from "./Menu";
import logo from "../assets/logo/icon-left-font-monochrome-white.png";
import { useNavigate } from "react-router-dom";
import MenuP from "./MenuP";
// fonction pour afficher l'entete
function Header() {
	// declaration de variable navigate, renvoie une fonction qui permet de naviguer
	const navigate = useNavigate();

	return (
		<header>
			<div className="entete">
				{/* onclick execute la fonction navigate // remplacer a href */}
				<img src={logo} onClick={() => navigate("/")} />
				{/* Si variable localstorage existe afficher menu p si non il va affichee le menu connexion */}
				{localStorage.getItem("userIds") ? <MenuP /> : <Menu />}
			</div>
		</header>
	);
}
export default Header;
