import {
	Card,
	Grid,
	CardActions,
	CardActionArea,
	CardMedia,
	CardContent,
	IconButton,
	Typography,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import useStyles from "../Movies/styles";

const Favorites = ({favorites, removeFromFavs }) => {
	

	const classes = useStyles();

	return (
		<Grid container className={classes.movies} spacing={2}>
			{favorites?.map((movie) => (
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
								<Typography variant="body2" component="p">
									{movie.Title}
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<IconButton>
								<DeleteOutlineIcon
									onClick={() => removeFromFavs(movie)}
									className={classes.delete}
								/>
							</IconButton>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default Favorites;
