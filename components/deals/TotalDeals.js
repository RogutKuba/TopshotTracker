import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import Paper from '@material-ui/core/Paper';

import { gql, useQuery } from "@apollo/client"
import { GET_MARKETDEALS } from '../../api/queries/queries'

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

    const { loading, error, data } = useQuery(GET_MARKETDEALS);

    const [currentdeals, setCurrentDeals] = useState([])

    useEffect(() => {
        if(data)
        {
            setCurrentDeals([...data.listDeals.items].reverse())
        }
    }, [data])

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
                        fontSize: 20,
                        fontWeight: 400,
                        color: '#f7f1f0',
                        width: '75%',
                        paddingBottom: '1%',
                        borderBottom: '1px solid rgba(47, 225, 185, 0.5)'
                    }}
                >
                    Market Deals
                </span>
            
                <div
                    style={{
                        marginTop: '2%',
                        width: "85%",
                        display: 'flex',
                        justifyContent: 'space-around',
                        color: '#f7f1f0',
                        fontSize: 20,
                    }}
                >
                    <MomentSpan>Moment</MomentSpan>
                    <MomentSpan>Time</MomentSpan>
                    <MomentSpan>Listing Price</MomentSpan>
                    <MomentSpan>Market Price</MomentSpan>
                    <MomentSpan>Price Difference</MomentSpan>
                    <MomentSpan>Link</MomentSpan>
                </div>

                { currentdeals.map((deal, index) => {

                    const moment_details = JSON.parse(JSON.parse(deal.moment_details))
                    const listing_details = JSON.parse(JSON.parse(deal.listing_details))
                    
                    //console.log('url is ', `https://assets.nbatopshot.com/resize/editions/${moment_details.assetPathPrefix.split('/')[4]}/${moment_details.play.id}/play_${moment_details.play.id}_${moment_details.assetPathPrefix.split('/')[4]}_capture_Hero_2880_2880_Black.jpg`)

       //ACTUAL     https://assets.nbatopshot.com/resize/editions/2_base_set_common/b3e0e414-3461-4e22-a2cd-fae4fcdd4527/play_b3e0e414-3461-4e22-a2cd-fae4fcdd4527_2_base_set_common_capture_Hero_2880_2880_Black.jpg

       //MINE       https://assets.nbatopshot.com/resize/editions/2_base_set_common/208ae30a-a4fe-42d4-9e51-e6fd1ad2a7a9b3e0e414-3461-4e22-a2cd-fae4fcdd4527_2_base_set_common/208ae30a-a4fe-42d4-9e51-e6fd1ad2a7a9_Hero_2880_2880_Black.jpg


                    return(
                        <div
                            key={`${deal.id}${index}`}
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
                                <div style={{maxWidth: '100%', textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap'}} >{moment_details.playData.stats.playerName}</div>

                                <div style={{position: 'absolute', fontSize: 14, marginTop: '2%', opacity: 0.75 }}>{moment_details.setData.flowName} Series {moment_details.setData.flowSeriesNumber}</div>
                            </MomentSpan>

                            <MomentSpan>
                                {new Date(deal.timestamp).toLocaleString()}
                            </MomentSpan>

                            <MomentSpan>${deal.listing_price}</MomentSpan>

                            <MomentSpan>${deal.average_price}</MomentSpan>

                            <MomentSpan
                                style={{
                                    color: "rgb(66, 130, 53)"
                                }}
                            >
                                ${(deal.average_price - deal.listing_price).toFixed(2)} ({((1 - deal.percent_difference) * 100).toFixed(2)}%)
                            </MomentSpan>

                            <MomentSpan>
                                <img 
                                    src={`https://assets.nbatopshot.com/resize/editions/${moment_details.assetPathPrefix.split('/')[4]}/${moment_details.playData.id}/play_${moment_details.playData.id}_${moment_details.assetPathPrefix.split('/')[4]}_capture_Hero_2880_2880_Black.jpg`}
                                    style={{maxWidth: '50%', maxHeight: '50%', cursor: 'pointer', opacity: 0.75, borderRadius: 15}}
                                    onClick={() => router.push(deal.listing_link)}
                                >
                                </img>
                            </MomentSpan>
                        </div>
                    )
                })}
            </div>
        </Paper>
    )
}