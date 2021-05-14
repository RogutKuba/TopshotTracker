import React from 'react'

import { useRouter } from 'next/router'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';


export default function Header()
{
    const router = useRouter()
    
    return(
        <div
            style={{
                width: '100%',
                marginBottom: '15%',
            }}
        >
                <span 
                    style={{
                        position: 'absolute',
                        left: '10%',
                        top: '5%',
                        paddingLeft: '1%',
                        paddingRight: '1%',
                        fontWeight: 500,
                        fontSize: 30,
                        fontFamily: 'Roboto',
                        color: '#f7f1f0',
                        paddingBottom: '0.5%',
                        borderBottom: '1px solid rgba(47, 225, 185)',
                    }}
                    onClick={() => router.push("/")} 
                >
                    TopShot Tracker
                </span>
                
                <div style={{
                    position: 'absolute',
                    right: '20%',
                    top: '5%',
                    display: 'flex',
                    width: '20%',
                    justifyContent: 'space-around',
                    paddingBottom: '0.3%',
                    borderBottom: '1px solid rgba(47, 225, 185)',
                }}>
                    <Button color="secondary" onClick={() => router.push("deals")} >
                        Deals
                    </Button>
                    <Button color="secondary" onClick={() => router.push("account")} >
                        Account Value
                    </Button>
                </div>

                {/* <div 
                    style={{
                        position: 'absolute',
                        top: '4.5%',
                        right: '3%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        color: 'white',
                        //paddingBottom: '0.3%',
                        //borderBottom: '1px solid rgba(47, 225, 185)',
                    }}
                >
                    <IconButton>
                        <MenuIcon color="primary" style={{ fontSize: 40 }} />
                    </IconButton>
                </div> */}
        </div>
    )
}