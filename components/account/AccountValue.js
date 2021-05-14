import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


import { Auth, JS } from 'aws-amplify';

import axios from 'axios'
import { Button } from '@material-ui/core';

const MomentSpan = styled.div`
    text-align: center;
    width: 15%;
    display: flex;
    justify-content: center;
    //font-size: 17px;
`;

export default function TotalIndex()
{
    const router = useRouter()

    const [userdata, setUserdata] = useState(false)
    const [accountdata, setAccountData] = useState(true)
    const [accountmoments, setAccountMoments] = useState([])

    const [newusername, setNewUsername] = useState(null)

    const [err, setErr] = useState(false)

    useEffect(() => {
        
        Auth.currentAuthenticatedUser()
        .then(data => {
            setUserdata(data)
            //console.log(data.attributes['custom:topshotname'])
            axios.post(
                'https://l4fco2q8kg.execute-api.us-east-1.amazonaws.com/default/getaccountvalue',
                {
                    nickname: data.attributes['custom:topshotname']
                }
            ).then((res, err) => {

                if(err)
                {
                    console.log('there was an error')
                }
                console.log(res.data)
                setAccountData(res.data)
                setAccountMoments(res.data.moments.sort((a, b) => {
                    return b.listing_price - a.listing_price
                }))
            })
            .catch((err) => {
                console.log(data.attributes['custom:topshotname'])
                setAccountData(false)
                setNewUsername(data.attributes['custom:topshotname'])
            })
            // setAccountData(false)
            // setNewUsername(userdata)
        })
        .catch(err => {
            router.push('/login')
        })
    }, [])

    const updateTopShotName = async () => {

        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, {
                'custom:topshotname': newusername
            }).then(() => {
                console.log('updated username')
                router.reload(window.location.pathname)
            })
        }
        catch(err){
            console.log('err', err)
        }
    }

    return(
        <Paper
            elevation={3}
            style={{
                marginTop: '3%',
                width: '60%',
                //minHeight: '125%',
                //backgroundColor: "#1c1c1c",
                //backgroundColor: "#01030a",
                backgroundColor: "#04081a",
                //border: '2px dashed rgba(47, 225, 185)',
                boxShadow: '10x 10px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Roboto',
                minHeight: 500,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingBottom: '1%',
                }}
            >
                <span
                    style={{
                        marginTop: '3%',
                        textAlign: 'center',
                        fontSize: 24,
                        fontWeight: 400,
                        color: '#f7f1f0',
                        width: '75%',
                        paddingBottom: '1%',
                        borderBottom: '1px solid rgba(47, 225, 185, 0.5)'
                    }}
                >
                    Account Value {typeof(accountdata) === "object" ? `For ${accountdata.username}` : null}
                </span>

                
                { accountdata ? (

                    typeof(accountdata) === "object" ? (
                        <>
                            <span
                                style={{
                                    marginTop: 30,
                                    color: '#f7f1f0',
                                    fontSize: 26,
                                    textAlign: 'center',
                                }}
                            >
                                Total Account Value: ${accountdata.totalValue.toFixed(2)}
                            </span>

                            <div
                                style={{
                                    marginTop: '3%',
                                    width: "85%",
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    color: '#f7f1f0',
                                    fontSize: 20,
                                }}
                            >
                                <MomentSpan>Moment</MomentSpan>
                                <MomentSpan>Market Price</MomentSpan>
                                <MomentSpan>Serial Number</MomentSpan>
                                <MomentSpan>Link</MomentSpan>
                            </div>

                            {accountmoments.map((moment) => {
                                const moment_details = JSON.parse(moment.moment_details)
                                return (
                                    <div
                                        key={moment.id}
                                        style={{
                                            //marginTop: '1%',
                                            width: "85%",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            fontSize: 18,
                                            color: '#f7f1f0',
                                            //backgroundColor: '#030820',
                                            borderBottom: '1px solid rgba(47, 225, 185, 0.125)',
                                            paddingTop: '1%',
                                            paddingBottom: '1%',
                                            //borderRadius: 25,
                                        }}
                                    >
                                        <MomentSpan style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1%', wordWrap: 'break-word'}} >
                                            <div style={{maxWidth: '100%', textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap'}} >{moment_details.play.stats.playerName}</div>

                                            <div style={{position: 'absolute', fontSize: 14, marginTop: '2%', opacity: 0.75 }}>{moment_details.set.flowName} Series {moment_details.set.flowSeriesNumber}</div>
                                        </MomentSpan>

                                        <MomentSpan>${moment.listing_price}</MomentSpan>

                                        <MomentSpan>{moment_details.flowSerialNumber}</MomentSpan>

                                        <MomentSpan>
                                            <img 
                                                src={`https://assets.nbatopshot.com/resize/editions/${moment_details.assetPathPrefix.split('/')[4]}/${moment_details.play.id}/play_${moment_details.play.id}_${moment_details.assetPathPrefix.split('/')[4]}_capture_Hero_2880_2880_Black.jpg`}
                                                style={{maxWidth: '50%', maxHeight: '50%', cursor: 'pointer', opacity: 0.75, borderRadius: 15}}
                                                onClick={() => router.push(moment.listing_link)}
                                            >
                                            </img>
                                        </MomentSpan>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 50,
                            }}
                        >
                            <CircularProgress />
                        </div>
                    )

                ) : (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: '#f7f1f0',
                            width: '100%',
                            marginTop: 50,
                        }}
                    >
                        <span>
                            There Was An Error! Please Ensure Your Topshot Username Is Correct or Try Again!
                        </span>

                        <TextField
                            style={{
                                marginTop: 25,
                                marginBottom: 25,
                            }}
                            value={newusername ? newusername : ''}
                            onChange={(e) => setNewUsername(e.target.value)}
                            label="Username"
                        />

                        <Button color="primary" onClick={updateTopShotName}>
                            Update
                        </Button>
                    </div>
                )
                }
            </div>
        </Paper>
    )
}