import image from "../assets/placeholder.png";
function Post() {
	return (
		<div className="post">
			<img src={image} className="img" />
			<h2 className="title">Exemple de post</h2>
			<div className="description">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry
			</div>
		</div>
	);
}

export default Post;
