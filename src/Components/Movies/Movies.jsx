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
	CircularProgress,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FacebookShareButton } from "react-share";
import useStyles from "./styles";
import Favorites from "../Favorites/Favorites";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearch] = useState("");
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);

	console.log(searchValue);

	// styles
	const classes = useStyles();

	let cancelToken;

	if (typeof cancelToken != typeof undefined) {
		cancelToken.cancel("Cancelling");
	}

	cancelToken = axios.CancelToken.source();

	const getMovies = () => {
		axios
			.get(
				`https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`,
				{ cancelToken: cancelToken.token }
			)
			.then((res) => {
				const { Search } = res.data;
				setMovies(Search);
				setLoading(!loading);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const saveToLocalStorage = (items) => {
		localStorage.setItem("movie-list", JSON.stringify(items));
	};

	const addToFavourites = (movie) => {
		const prevFavs = [...favorites];
		// check if movie is in array
		if (prevFavs.includes(movie)) {
			return null;
		} else {
			const newFavs = [...favorites, movie];
			saveToLocalStorage(newFavs);
			setFavorites(newFavs);
		}
	};

	const removeFromFavs = (movie) => {
		const newFavsList = favorites.filter(
			(favorite) => favorite.imdbID !== movie.imdbID
		);
		setFavorites(newFavsList);
	};

	useEffect(() => {
		getMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

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
					className={classes.search}
				/>
			</div>
			<Typography variant="h3" color="secondary">
				Movies
			</Typography>
			<>
				{!movies ? (
					<>
						<h4 className={classes.start}>Search...</h4>
						<CircularProgress disableShrink />
					</>
				) : (
					<Grid container className={classes.movies} spacing={2}>
						{movies?.map((movie) => (
							<Grid item key={movie.imdbID}>
								<Card className={classes.imagePoster}>
									<CardActionArea>
										<CardMedia
											component="img"
											alt={movie.Title}
											className={classes.img}
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
												onClick={() =>
													addToFavourites(movie)
												}
												color="secondary"
											/>
										</IconButton>
										<IconButton>
											<FacebookShareButton
												url="https://gallant-albattani-ce1704.netlify.app/ "
												quote={movie.Title}
												hashtag="#movierecommendadtion"
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
				)}
			</>
			<Divider className={classes.divider} />
			<div className={classes.favorites}>
				<Typography variant="h3" color="secondary">
					Favorites
				</Typography>
				<Favorites
					favorites={favorites}
					removeFromFavs={removeFromFavs}
				/>
			</div>
		</div>
	);
};

export default Movies;
