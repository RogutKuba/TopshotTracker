import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Auth } from 'aws-amplify';
import { Button, Typography } from '@material-ui/core';

import axios from "axios"

export default function TotalUser()
{
    const router = useRouter()

    const [user, setUser] = useState(null)

    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then(data => {
            setUser(data)

            console.log('user data is ', data)

        })
        .catch(err => {
            console.log('meme', err)
            setUser(null)
        })

        // axios({
        //     method: 'options',
        //     url: 'https://mtw61co68i.execute-api.us-east-1.amazonaws.com/getAccountValue',
        //     data: {
        //         nickname: "rogutkuba"
        //     }
        //   })
    }, [])

    return(
        <div
            style={{
                color: '#f7f1f0',
                position: 'absolute',
                width: '100%',
                top: 25,
                fontFamily: 'Roboto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            { user ? 
            (
                <>
                    <span
                        style={{
                            width: '50%',
                            paddingBottom: 5,
                            borderBottom: '1px solid rgba(47, 225, 185, 0.5)',
                            textAlign: 'center',
                            marginBottom: '5%',
                        }}
                    >
                        User Name
                    </span>
                    <span
                        style={{
                            width: '50%',
                            paddingBottom: 5,
                            textAlign: 'center',
                        }}
                    >
                        {user.attributes.email}
                    </span>
                    <Button
                        color="primary"
                        style={{
                            position: 'absolute',
                            top: '150%',
                        }}
                        onClick={() => {
                            Auth.signOut()
                            setUser(null)
                        }}
                    >
                        Log Out
                    </Button>
                </>
            ) : 
            (
                <>
                    <Button
                        color="primary"
                        onClick={() => router.push('/login')}
                        style={{
                            marginTop: '10%'
                        }}
                    >
                        Log In
                    </Button>
            
                    <Button
                        color="primary"
                        onClick={() => router.push('/signup')}
                        style={{
                            marginTop: '5%'
                        }}
                    >
                        Sign Up
                    </Button>
                </>
            )
            }
        </div>
    )
}