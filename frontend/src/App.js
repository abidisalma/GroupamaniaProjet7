// importation des packages
import { Route, Routes } from "react-router-dom";
// importaion des pages et des composants
import AddPost from "./pages/AddPost";
import DetailsPost from "./pages/DetailsPost";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import Login from "./pages/Login";
import UpdatePost from "./pages/UpdatePost";

function App() {
	return (
		<Routes>
			{/* declaration des route */}
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<Login />} />
			<Route path="/inscription" element={<Inscription />} />
			<Route path="/addpost" element={<AddPost />} />
			<Route path="/posts/:id" element={<DetailsPost />} />
			<Route path="/posts/update/:id" element={<UpdatePost />} />
		</Routes>
	);
}

export default App;
