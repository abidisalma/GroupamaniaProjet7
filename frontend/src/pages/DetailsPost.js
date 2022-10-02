import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo/icon-left-font-monochrome-white.png";
import Header from "../components/Header";
import Post from "../services/post.services";

function DetailsPost() {
	// on recuperer l'id du post avec useParam
	const { id } = useParams();
	// on declare un variable use state de type tableau
	const [post, setPost] = useState([]);
	// on declare un variable count utiliser dans useeffect pour executer la fonction une seule fois
	let count = 0;
	const navigate = useNavigate();
	//a chaque changement de variabe count execute la fonction getdta
	useEffect(() => {
		getdata();
	}, [count]);
	//fonction pour recuperer les info de la post
	const getdata = () => {
		//on appel la fonction getone dans axios (service post)
		Post.getOne(id)
			.then(response => {
				//affectation
				setPost(response.data);
			})
			.catch();
	};

	//on excute la fonction deletePost pour supprimer la post
	const deletePost = id => {
		//on appel la fonction deletepost
		Post.deletepost(id)
			.then(val => {
				navigate("/");
			})
			.catch(err => {
				console.log(err?.response?.data);
			});
	};
	//on excute la fonction addlike pour ajouter le like a la post
	const addlike = id => {
		let like = {
			like: 1
		};
		// on appel la fonction like dans axios(service post)
		Post.like(like, id)
			.then(val => {
				getdata();
				console.log(val);
			})
			.catch(err => {
				console.log(err?.response?.data);
			});
	};
	//on excute la fonction deletelike pour supprimer le like
	const deletelike = id => {
		let like = {
			like: 0
		};
		Post.like(like, id)
			.then(val => {
				getdata();
				console.log(val);
			})
			.catch(err => {
				console.log(err?.response?.data);
			});
	};
	//on excute la fonction adddislike pour ajouter le like a la post
	const adddislike = id => {
		let like = {
			like: -1
		};
		Post.like(like, id)
			.then(val => {
				getdata();
				console.log(val);
			})
			.catch(err => {
				console.log(err?.response?.data);
			});
	};

	return (
		<div className="App">
			<Header />

			<div className="postFlex">
				<div className="images">
					<img src={post?.imageUrl} className="img" />
				</div>
				<div className="detail">
					<h2>{post?.title}</h2>
					<p>{post?.description}</p>
					<div className="socia">
						{/*on verifie si l'user a mis un dislike sur la post*/}
						{!post?.usersDisliked?.includes(localStorage.getItem("userIds")) ? (
							<button
								className="like"
								onClick={() => {
									if (
										post?.usersLiked.includes(localStorage.getItem("userIds"))
									) {
										deletelike(post?._id);
									} else {
										addlike(post?._id);
									}
								}}
							>
								<FontAwesomeIcon icon={faThumbsUp} /> {post?.likes} like
							</button>
						) : (
							<button className="like" disabled="true">
								<FontAwesomeIcon icon={faThumbsUp} /> {post?.likes} like
							</button>
						)}
						{/*on verifie si l'user a mis un like sur la post*/}
						{!post?.usersLiked?.includes(localStorage.getItem("userIds")) ? (
							<button
								className="dislike"
								onClick={() => {
									if (
										post?.usersDisliked.includes(
											localStorage.getItem("userIds")
										)
									) {
										//on  supprimer un like
										deletelike(post?._id);
									} else {
										//on  ajouter un like
										adddislike(post?._id);
									}
								}}
							>
								<FontAwesomeIcon icon={faThumbsDown} /> {post?.dislikes} dislike
							</button>
						) : (
							<button className="dislike" disabled="true">
								<FontAwesomeIcon icon={faThumbsDown} /> {post?.dislikes} dislike
							</button>
						)}
					</div>
					<div className="btn">
						{localStorage.getItem("role") === "admin" ? (
							<>
								<button className="action" onClick={() => deletePost(post?._id)}>
									Supprimer
								</button>
								<button
									className="action green"
									onClick={() => navigate("/posts/update/" + post?._id)}
								>
									Modifier
								</button>
							</>
						) : (
							<>
								{localStorage.getItem("userIds") === post?.userId ? (
									<>
										<button
											className="action"
											onClick={() => deletePost(post?._id)}
										>
											Supprimer
										</button>
										<button
											className="action green"
											onClick={() => navigate("/posts/update/" + post?._id)}
										>
											Modifier
										</button>
									</>
								) : (
									""
								)}
							</>
						)}
						<button className="action green" onClick={() => navigate("/")}>
							Retour
						</button>
					</div>
				</div>
			</div>

			<footer>
				<img src={logo} />
			</footer>
		</div>
	);
}

export default DetailsPost;
