import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "./Link";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginBottom: 30
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	header: {
		backgroundColor: "#212121"
	}
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar className={classes.header} position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<Link color="inherit" to="/">
							Ninja
						</Link>
					</Typography>
					<Button color="inherit">
						<Link color="inherit" to="/about">
							About
						</Link>
					</Button>
					<Button color="inherit">
						<Link color="inherit" to="/test">
							Test
						</Link>
					</Button>
					<Button color="inherit">
						<Link color="inherit" to="/contact/examples">
							Form
						</Link>
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
