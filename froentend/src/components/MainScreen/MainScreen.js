import { Container, TableRow } from '@material-ui/core'
import React from 'react'
import './mainscreen.css'

const MainScreen = ({title,children}) => {
    return (
        <div className="main_screen_wrapper">
              <>
              <TableRow>
                    <div className="main_screen">
                        
                       {
                           title &&
                            (
                               <>
                                <h1 className="head_title"> {title} </h1>
                                <hr />
                               </>
                           )
                       }
                       {children}
                    </div>
                </TableRow>
              </>
            
        </div>
    )
}

export default MainScreen
