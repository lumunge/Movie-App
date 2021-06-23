import { useState, useEffect } from "react";
import axios from "axios";
import {
	Grid,
	Card,
	TextField,
	CardActions,
	CardMedia,
	Typography,
	CardContent,
	CardActionArea,
	IconButton,
	Divider,
	CircularProgress
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FacebookShareButton } from "react-share";
import useStyles from "./styles";
import Favorites from "../Favorites/Favorites";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearch] = useState("");
	const [favorites, setFavorites] = useState([]);

	const classes = useStyles();

	const getMovies  = () => {
		axios.get(`http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`)
			.then((res) => {
				const {Search} = res.data;
				setMovies(Search);
				setLoading(!loading);
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		getMovies();
	}, [searchValue]);

	// const handleRemoveFromFavorites = (movie) => {
	// 	const newFavoritesList = favorites.filter(
	// 		(favorite) => favorite.imdbID !== movie.imdbID
	// 	);
	// 	setFavorites(newFavoritesList);
	// };

	// const saveToLocalStorage = (items) => {
	// 	localStorage.setItem("movie-list", JSON.stringify(items));
	// };

	return (
		<div className={classes.main}>
			<div className={classes.searchBar}>
				<TextField
					label="Search Movies"
					variant="outlined"
					color="secondary"
					autoFocus
					value={searchValue}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<Typography variant="h3" color="secondary">
				Movies
			</Typography>
			<div className={classes.movieContainer}>
				{loading ? (
				<Grid container className={classes.movies} spacing={2}>
					{movies?.map((movie) => (
						<Grid item key={movie.imdbID}>
							<Card className={classes.imagePoster}>
								<CardActionArea>
									<CardMedia
										component="img"
										alt={movie.Title}
										height="300"
										image={movie.Poster}
										title={movie.Title}
									/>
									<CardContent>
										<Typography
											color="textSecondary"
											variant="subtitle2"
										>
											{movie.Title}
										</Typography>
										<Typography variant="caption">
											{movie.Type}, {movie.Year}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon
											// onClick={() =>
											// 	handleAddToFavorites(movie)
											// }
											color="secondary"
										/>
									</IconButton>
									<IconButton>
										<FacebookShareButton
											url="http://localhost:3000"
											quote={"Check out this movie"}
											hashtag="#movies"
										>
											<FacebookIcon
                                                className={classes.facebook}
                                            />{" "}
										</FacebookShareButton>
									</IconButton>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
				) : (
					<div>
						<CircularProgress color="secondary" />
					</div>
				)}
			</div>
			<Divider className={classes.divider} />
			<div className={classes.favorites}>
				<Typography variant="h3" color="secondary">
					Favorites
				</Typography>
				<Favorites
					favorites={favorites}
					// removeFromFavorites={handleRemoveFromFavorites}
				/>
			</div>
		</div>
	);
};

export default Movies;


