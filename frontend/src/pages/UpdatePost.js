import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/globale.scss";
import logo from "../assets/logo/icon-left-font-monochrome-white.png";
import Header from "../components/Header";
import Post from "../services/post.services";

function UpdatePost() {
	const [post, setPost] = useState([]);
	const { id } = useParams();
	const [values, setValues] = useState([]);
	const [error, setError] = useState([]);
	const [success, setSuccess] = useState([]);
	const navigate = useNavigate();

	let count = 0;
	useEffect(() => {
		Post.getOne(id)
			.then(response => {
				setPost(response.data);
				console.log(response.data);
			})
			.catch();
	}, [count]);

	const handleChange = event => {
		setValues(values => ({
			...values,
			[event.target.name]: event.target.value
		}));
	};
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
		formData.append("userId", localStorage.getItem("userId"));
		formData.append("title", values.title || post?.title);
		formData.append("description", values.description || post?.description);
		formData.append("image", values.file);
		//appel de fonction modification post dans service.post
		Post.update(formData, id)
			.then(response => {
				setSuccess(response.data.message);
				navigate("/posts/" + id);
			})
			.catch();
	};
	return (
		<div className="App">
			<Header />

			<div className="form">
				<h2>Modifier post </h2>

				<label className="error">{error}</label>
				<label className="success">{success}</label>
				<div className="inputgroup">
					<label>Titre</label>
					<input
						type="text"
						defaultValue={post?.title}
						name="title"
						onChange={handleChange}
					></input>
				</div>
				<div className="inputgroup">
					<label>Description</label>
					<input
						type="textarea"
						defaultValue={post?.description}
						name="description"
						onChange={handleChange}
					></input>
				</div>
				<div className="inputgroup">
					<label>image</label>
					<input type="file" name="file" onChange={handleChange_file}></input>
				</div>
				<div className="images">
					<img src={post?.imageUrl} className="img2" />
				</div>
				<div className="inputgroup">
					<button onClick={handleSubmit}>Modifier post</button>
				</div>
			</div>

			<footer>
				<img src={logo} />
			</footer>
		</div>
	);
}

export default UpdatePost;
