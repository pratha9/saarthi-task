import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button, LinearProgress } from '@material-ui/core'
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

function Display(props) {
	const { classes } = props

	if(!firebase.getCurrentUsername()) {
		alert('Please login first')
		props.history.replace('/login')
		return null
	}

	const [url, setUrl] = useState('')
	const [data, setData] = useState('')


	useEffect(() => {
		firebase.getUrl().then(setUrl)

		try{
			fetch("https://cors-anywhere.herokuapp.com/"+url, {
				method: 'GET',
				headers:{
				  'X-Requested-With': 'XMLHttpRequest'
				}
			  }).then(response => response.text()).then(setData)
		}catch(error){
			alert(error.message)
		}
	})


	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<PersonIcon />
				</Avatar>
				<Typography style={{ wordWrap: "break-word" }} variant="h5">
					Your URL: {data && data.toString()[0] != "T" ? <div dangerouslySetInnerHTML={{ __html: data }} /> : <LinearProgress size={100} />}
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={toDash}
					className={classes.submit}>
					Submit another URL
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

	async function toDash(){

		props.history.push('/dashboard')
	}

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}

}

export default withRouter(withStyles(styles)(Display))