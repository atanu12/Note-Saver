import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles((theme)=>({
    spinner:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
        backdropFilter:'white',
        color:'white',
        height: "5rem",
        width:'5rem'
    },
}))
const Loding = () => {
    const classes = useStyles()
    return (
        <div>
            <Backdrop  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
            <CircularProgress className={classes.spinner} />
            </Backdrop>
            
            
        </div>
    )
}

export default Loding
