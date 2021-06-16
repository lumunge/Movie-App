import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
	main: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: "4rem",
	},
	searchBar: {
		margin: "2rem 0",
	},
	movies: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
	},
	imagePoster: {
		width: 345,
	},
	favorites: {
		padding: "2rem 0",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	divider: {
		margin: "2rem 0",
		width: "80%",
		backgroundColor: "#85929e",
		height: "5px",
	},
	facebook: {
		color: "#3498db",
	},
	delete: {
		color: "#e74c3c",
	},
}));