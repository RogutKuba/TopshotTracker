import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { Auth } from 'aws-amplify';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function TotalLogin()
{
    const router = useRouter()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [stage, setStage] = useState(0)

    const [error, setError] = useState(false)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }



    const handleLogin = async () => {
        setLoading(true)
        try {
            const user = await Auth.signIn(email, password);
            console.log(user);
            setStage(1)
            setTimeout(() => {
                router.push('/')
            }, 1000) 
        } catch (error) 
        {
            console.log('error is ', error)
            setError(true)
            setLoading(false)
        }
    }

    return(
        <Paper
            elevation={3}
            style={{
                marginTop: '3%',
                width: '30%',
                backgroundColor: "#04081a",
                boxShadow: '10x 10px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Roboto',
                minHeight: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingBottom: '1%',
                    width: '100%',
                }}
            >
                <Typography 
                    variant="h3" 
                    component="h3" 
                    color="secondary"
                    style={{
                        marginBottom: '3%',
                    }}
                >
                    Log In
                </Typography>

                <div style={{ borderBottom: '1px solid #2fe1b9', width: '65%', marginBottom: 35 }} ></div>

                { stage === 0 ? 
                (
                    <>
                        <TextField
                            value={email}
                            error={error}
                            helperText={error ? 'Incorrect username or password' : null}
                            label="Email"
                            onChange={handleEmailChange}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Email"
                        />
                        <TextField
                            value={password}
                            error={error}
                            helperText={error ? 'Incorrect username or password' : null}
                            label="Password"
                            type="password"
                            onChange={handlePasswordChange}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Password"
                        />

                        <span
                            onClick={() => router.push('/forgotpassword')}
                            style={{
                                marginTop: 5,
                                color: '#f7f1f0',
                                fontSize: 14,
                                cursor: 'pointer',
                            }} 
                        >
                            Forgot Password?
                        </span>

                        <Button 
                            color="primary" 
                            onClick={handleLogin}
                            style={{
                                marginTop: '10%',
                            }} 
                            size="large"
                        >
                            Log In
                        </Button>

                        <span
                            onClick={() => router.push('/signup')}
                            style={{
                                marginTop: 5,
                                color: '#f7f1f0',
                                fontSize: 16,
                                cursor: 'pointer',
                            }} 
                        >
                            Click Here To Sign Up
                        </span>

                        {loading && <CircularProgress color="primary"/>}
                    </>
                ) :
                    <Typography 
                        variant="h6" 
                        component="h6" 
                        color="secondary"
                        style={{
                            marginTop: '5%',
                        }}
                    >
                        Logged In!
                    </Typography>
                }
                
            </div>
        </Paper>
    )
}