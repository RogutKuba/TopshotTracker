import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { Auth } from 'aws-amplify';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function TotalForgot()
{
    const router = useRouter()

    const [email, setEmail] = useState('')

    const [code, setCode] = useState(null)
    const [password, setPassword] = useState('')
    const [verifypassword, setVerifyPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const [stage, setStage] = useState(0)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleCheckUsername = async () => {
        setLoading(true)

        await Auth.forgotPassword(email)
            .then(data => console.log(data))
            .catch(err => console.log(err));

        setLoading(false)
        setStage(1)
    }

    const handleChangePasword = async () => {
        setLoading(true)

        await Auth.forgotPasswordSubmit(email, code, password)
        .then(data => console.log(data))
        .catch(err => console.log(err));

        setLoading(false)
        setStage(2)

        setTimeout(() => {
            router.push('/login')
        }, 1000) 
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
                    Forgot Password
                </Typography>

                <div style={{ borderBottom: '1px solid #2fe1b9', width: '65%', marginBottom: 35 }} ></div>

                { stage === 0 ? 
                (
                    <>
                        <TextField
                            value={email}
                            label="Email"
                            onChange={handleEmailChange}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Email"
                        />

                        <Button 
                            color="primary" 
                            onClick={handleCheckUsername}
                            style={{
                                marginTop: '10%',
                            }} 
                        >
                            Send Email
                        </Button>
                    </>
                ) : stage === 1 ? (
                    <>
                        <TextField
                            value={code}
                            label="Code"
                            type="text"
                            onChange={(e) => setCode(e.target.value)}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Code"
                        />

                        <TextField
                            value={password}
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Password"
                        />

                        <TextField
                            value={verifypassword}
                            error={password != verifypassword && verifypassword !== ''}
                            helperText={password != verifypassword && verifypassword !== '' ? 'Password not matching' : null}
                            label="Verify Password"
                            type="password"
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Verify-Password"
                        />

                        <Button 
                            color="primary" 
                            onClick={handleChangePasword}
                            style={{
                                marginTop: '10%',
                            }} 
                        >
                            Change Password
                        </Button>
                    </>
                ) : (
                    <Typography 
                        variant="h6" 
                        component="h6" 
                        color="secondary"
                        style={{
                            marginTop: '5%',
                        }}
                    >
                        Password Changed!
                    </Typography>
                )
                }
                
                {loading && <CircularProgress color="primary"/>}
            </div>
        </Paper>
    )
}