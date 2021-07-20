import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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
	search: {
		background: " #5d6d7e ",
		padding: "-4rem -2rem",
	},
	movies: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
	},
	img: {
		height: 450,
		[theme.breakpoints.down("xs")]: {
			height: 300,
		},
	},
	imagePoster: {
		width: 345,
		[theme.breakpoints.down("xs")]: {
			width: 250,
			height: 450,
		},
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
	start: {
		color: "#fff",
	},
}));
