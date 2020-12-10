import React, {useState } from 'react'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function Dashboard(props) {
	const { classes } = props

	if(!firebase.getCurrentUsername()) {
		alert('Please login first')
		props.history.replace('/login')
		return null
	}

	const [url, setUrl] = useState('')

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<PersonIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Welcome, User ! 
				</Typography>
				<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="url">Enter URL</InputLabel>
						<Input name="url" type="text" id="url" autoComplete="off" value={url} onChange={e => setUrl(e.target.value)}  />
					</FormControl>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={submit_url}
					className={classes.submit}>
					Submit URL
          		</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}

	async function submit_url() {

		if(url == '')
			alert('All fields are required !')

		else{
			try{
				await firebase.addUrl(url)
				props.history.replace('/display')
			}
			catch(error){
	
				alert(error.message)
			}
		}
	}
}

export default withRouter(withStyles(styles)(Dashboard))