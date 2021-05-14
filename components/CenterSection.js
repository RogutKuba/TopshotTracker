import React from 'react'

import TotalIndex from './indextracker/TotalIndex'

import Paper from '@material-ui/core/Paper';

export default function CenterSection()
{
    return(
        <Paper
            elevation={3}
            style={{
                marginTop: '3%',
                width: '50%',
                minHeight: '50%',
                //backgroundColor: "#1c1c1c",
                //backgroundColor: "#01030a",
                backgroundColor: "#04081a",
                //border: '2px dashed rgba(47, 225, 185)',
                boxShadow: '10x 10px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Roboto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TotalIndex/>
        </Paper>
    )
}