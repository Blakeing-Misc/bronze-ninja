import React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { Divider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	appBar: {
		position: "relative"
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	stepper: {
		padding: theme.spacing(3, 0, 5)
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	}
}));

function encode(data) {
	const formData = new FormData();

	for (const key of Object.keys(data)) {
		formData.append(key, data[key]);
	}

	return formData;
}

export default function Contact() {
	const classes = useStyles();

	const [state, setState] = React.useState({});

	const handleChange = e => {
		setState({ [e.target.name]: e.target.value });
	};

	const handleAttachment = e => {
		setState({ [e.target.name]: e.target.files[0] });
	};

	const handleSubmit = e => {
		e.preventDefault();
		const form = e.target;
		fetch("/", {
			method: "POST",
			body: encode({
				"form-name": form.getAttribute("name"),
				...state
			})
		})
			.then(() => navigate(form.getAttribute("action")))
			.catch(error => alert(error));
	};

	return (
		<Layout>
			<main className={classes.layout}>
				<Typography variant="h6" gutterBottom>
					First, let us know a little about your company.
				</Typography>
				<Divider />
				<br />
				<form
					name="file-upload"
					method="post"
					action="/contact/thanks/"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					onSubmit={handleSubmit}
				>
					{/* The `form-name` hidden field is required to support form submissions without JavaScript */}
					<input type="hidden" name="form-name" value="file-upload" />
					<p hidden>
						<label>
							Don’t fill this out:{" "}
							<input name="bot-field" onChange={handleChange} />
						</label>
					</p>

					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<FormControl>
								<InputLabel htmlFor="company">Company</InputLabel>
								<Input id="company" />
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id={"url"}
								name={"url"}
								label="What will be the URL of the website?"
								fullWidth
								variant="outlined"
								onChange={handleChange}
								type={"text"}
								htmlFor={"url"}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="purpose"
								name="purpose"
								label="What is the purpose of your site?"
								fullWidth
								variant="outlined"
								multiline
								rowsMax="10"
								onChange={handleChange}
								type={"text"}
								htmlFor={"purpose"}
							/>
						</Grid>
						<Grid item xs={12}>
							<label>
								<Typography>File:</Typography>
								<input
									type="file"
									name="attachment"
									onChange={handleAttachment}
								/>
							</label>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" type="submit">
								Send
							</Button>
						</Grid>
					</Grid>
				</form>
			</main>
		</Layout>
	);
}
