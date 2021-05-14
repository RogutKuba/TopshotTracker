import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { Auth } from 'aws-amplify';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

export default function TotalSignUp()
{
    const router = useRouter()

    const [username, setUsername] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifypassword, setVerifyPassword] = useState('')

    const [passworderror, setPasswordError] = useState(false)

    const [stage, setStage] = useState(0)

    const [confirmcode, setConfirmCode] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleVerifyPasswordChange = (e) => {
        setVerifyPassword(e.target.value)
    }

    const handleConfirmCodeChange = (e) => {
        setConfirmCode(e.target.value)
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSignUp = async () => {
        if(password === verifypassword || verifypassword === '')
        {
            try {
                const { user } = await Auth.signUp({
                    username: email,
                    password: password,
                    attributes: {
                        'custom:topshotname': username,          // optional
                    }
                });
                console.log(user);
                setStage(1)
            } catch (error) 
            {
                console.log('error signing up:', error);
            }
            return null
        }
        setPasswordError(true)
        console.log('not signin up')
    }

    const handleConfirmation = async () => {
        try {
            await Auth.confirmSignUp(email, confirmcode);
            setStage(2)

            setTimeout(() => {
                router.push('login')
            }, 1000) 

        } catch (error) {
              console.log('error confirming sign up', error);
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
                    Sign Up
                </Typography>

                <div style={{ borderBottom: '1px solid #2fe1b9', width: '65%' }} ></div>

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

                        <TextField
                            value={username}
                            label="Topshot Username"
                            onChange={handleUsernameChange}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Username"
                        />

                        <TextField
                            value={password}
                            error={passworderror}
                            helperText={passworderror ? "Password does not meet requirements" : null}
                            label="Password"
                            type="password"
                            onChange={handlePasswordChange}
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
                            onChange={handleVerifyPasswordChange}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Verify-Password"
                        />

                        <Button 
                            color="primary" 
                            onClick={handleSignUp}
                            style={{
                                marginTop: '10%',
                            }} 
                        >
                            Sign Up
                        </Button>
                    </>
                ) : stage === 1 ?
                (
                    <>
                        <Typography 
                            variant="h6" 
                            component="h6" 
                            color="secondary"
                            style={{
                                marginTop: '5%',
                            }}
                        >
                            Sign Up
                        </Typography>

                        <TextField
                            value={confirmcode}
                            label="Confirmation Code"
                            onChange={handleConfirmCodeChange}
                            style={{
                                marginTop: 25,
                                width: '50%',
                            }}
                            id="Confirmation-Code"
                        />

                        <Button 
                            color="secondary" 
                            onClick={handleConfirmation}
                            style={{
                                marginTop: '10%',
                            }} 
                        >
                            Confirm
                        </Button>
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