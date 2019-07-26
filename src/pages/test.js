import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddressForm from "../components/checkout/AddressForm";
import PaymentForm from "../components/checkout/PaymentForm";
import Review from "../components/checkout/Review";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Layout from "../components/Layout";
import {
	Collapse,
	Drawer,
	Grid,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	List,
	Typography,
	Button,
	StepButton,
	Step,
	Stepper
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
	root: {},
	button: {
		marginRight: theme.spacing(1)
	},
	completed: {
		display: "inline-block"
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	list: {
		width: 250
	},
	appBar: {
		position: "relative"
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
			width: 700,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},

	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

function getSteps() {
	return [
		"Input Website Data",
		"Input Account Information",
		"Schedule a Design Ninja"
	];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <PaymentForm />;
		case 2:
			return <Review />;
		default:
			return "Unknown step";
	}
}

export default function HorizontalNonLinearStepper() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState({});
	const steps = getSteps();
	const [open, setOpen] = React.useState(true);
	const [state, setState] = React.useState({
		left: false,
		right: false
	});

	const toggleDrawer = (side, open) => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = side => (
		<div className={classes.list} role="presentation">
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem button onClick={handleClick}>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="Inbox" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<Stepper nonLinear orientation="vertical" activeStep={activeStep}>
							{steps.map((label, index) => (
								<Step key={label}>
									<StepButton
										onClick={handleStep(index)}
										completed={completed[index]}
									>
										{label}
									</StepButton>
								</Step>
							))}
						</Stepper>
					</List>
				</Collapse>
			</List>
		</div>
	);

	function totalSteps() {
		return steps.length;
	}

	function completedSteps() {
		return Object.keys(completed).length;
	}

	function isLastStep() {
		return activeStep === totalSteps() - 1;
	}

	function allStepsCompleted() {
		return completedSteps() === totalSteps();
	}

	function handleNext() {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	}

	const handleStep = step => () => {
		setActiveStep(step);
	};

	function handleComplete() {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	}

	function handleReset() {
		setActiveStep(0);
		setCompleted({});
	}

	function handleClick() {
		setOpen(!open);
	}

	return (
		<Layout>
			<React.Fragment>
				<Grid container justify="center" alignItems="center">
					<Button variant="outlined" onClick={toggleDrawer("left", true)}>
						Open Left
					</Button>
					<Button variant="outlined" onClick={toggleDrawer("right", true)}>
						Open Right
					</Button>
					<Drawer open={state.left} onClose={toggleDrawer("left", false)}>
						{sideList("left")}
					</Drawer>
					<Drawer
						anchor="right"
						open={state.right}
						onClose={toggleDrawer("right", false)}
					>
						{sideList("right")}
					</Drawer>
				</Grid>

				<main className={classes.layout}>
					<Stepper nonLinear activeStep={activeStep}>
						{steps.map((label, index) => (
							<Step key={label}>
								<StepButton
									onClick={handleStep(index)}
									completed={completed[index]}
								>
									{label}
								</StepButton>
							</Step>
						))}
					</Stepper>
					<div>
						{allStepsCompleted() ? (
							<div>
								<Typography className={classes.instructions}>
									All steps completed - you&apos;re finished
								</Typography>
								<Button onClick={handleReset}>Reset</Button>
							</div>
						) : (
							<div>
								<Typography className={classes.instructions}>
									{getStepContent(activeStep)}
								</Typography>
								<div>
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										className={classes.button}
									>
										Back
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										Next
									</Button>
									{activeStep !== steps.length &&
										(completed[activeStep] ? (
											<Typography
												variant="caption"
												className={classes.completed}
											>
												Step {activeStep + 1} already completed
											</Typography>
										) : (
											<Button
												variant="contained"
												color="primary"
												onClick={handleComplete}
											>
												{completedSteps() === totalSteps() - 1
													? "Finish"
													: "Complete Step"}
											</Button>
										))}
								</div>
							</div>
						)}
					</div>
				</main>
			</React.Fragment>
		</Layout>
	);
}
