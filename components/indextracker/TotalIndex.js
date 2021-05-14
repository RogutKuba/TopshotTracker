import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { gql, useQuery } from "@apollo/client"
import { GET_INDEXDATA } from '../../api/queries/queries'

import Paper from '@material-ui/core/Paper';

export default function TotalIndex()
{
    const { loading, error, data } = useQuery(GET_INDEXDATA);

    const [graphdata, setGraphData] = useState([])

    const [chartoptions, setChartOptions] = useState({
        chart: {
            type: 'area',
            //height: '100%',
            zoom: {
                autoScaleYaxis: true
            }
        },
        annotations: {
            xaxis: [{
                //x: new Date('14 Nov 2012').getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
                label: 
                {
                    show: true,
                    text: 'Rally',
                    style: {
                        color: "#fff",
                        background: '#775DD0'
                    }
                }
            }]
        },
        dataLabels: 
        {
            enabled: false
        },
        markers: 
        {
            size: 0,
            style: 'hollow',
        },
        xaxis: 
        {
            type: 'datetime',
            //min: new Date('01 Mar 2012').getTime(),
            tickAmount: 6,
        },
        tooltip: 
        {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: 
        {
            type: 'solid',
        },
        colors: ['rgba(47, 225, 185)'],
    })

    useEffect(() => {
        if(data)
        {
            let p = 60 * 60 * 1000; // milliseconds in an hour

            
            const new_data = data.listAllStarIndices.items.map((item) => {
                const date_arr = (new Date(Math.round(item.time / p ) * p)).toString().split(":")

                return([item.time, item.value])
                /*
                return({
                    x: (new Date(Math.round(item.time / p ) * p)).toString().substr(0, 21),
                    y: item.value,
                })
                */
            })
            
            setGraphData(new_data)
        }
    }, [data])

    const chartOptions = {
        chart: {
          id: 'apexchart-example',
        },
        fill: {
            type: 'solid',
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
            //intersect: true,
            shared: true,
        },
        colors: ['rgba(47, 225, 185)'],
        xaxis: {
            labels: {
                style: {
                    colors: 'rgb(255, 255, 255)',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'rgb(255, 255, 255)',
                },
            },
        }
    }

    const chartData = [{
        name: 'All Star Index',
        data: graphdata
        /*[{
            x: "a",
            y: 120
          }, {
            x: "b",
            y: 480
          }, {
            x: "c",
            y: 330
          },
          {
            x: "d",
            y: 530
          },
          {
            x: "e",
            y: 750
          },
          {
            x: "f",
            y: 500
          },
          {
            x: "g",
            y: 330
          }
        ]*/
      }]

    const new_options = {
        chart: {
            type: 'area',
            zoom: {
            autoScaleYaxis: true
            }
        },
        annotations: {
            /*
        yaxis: 
        [{
            y: 30,
            borderColor: '#999',
            label: {
                show: true,
                text: 'Support',
                style: {
                    color: "#fff",
                    background: '#00E396'
                }
            }
        }],
        */
        xaxis: [{
            //x: new Date('14 Nov 2012').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: 
            {
                show: true,
                text: 'Rally',
                style: {
                    color: "#fff",
                    background: '#775DD0'
                }
            }
        }]
        },
        dataLabels: 
        {
            enabled: false
        },
        markers: 
        {
            size: 0,
            style: 'hollow',
        },
        xaxis: 
        {
            type: 'datetime',
            //min: new Date('01 Mar 2012').getTime(),
            tickAmount: 6,
        },
        tooltip: 
        {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: 
        {
            type: 'solid',
        },
        colors: ['rgba(47, 225, 185)'],
    };

    return(
        <Paper
            elevation={3}
            style={{
                marginTop: '3%',
                width: '65%',
                minHeight: '50%',
                //backgroundColor: "#1c1c1c",
                //backgroundColor: "#01030a",
                backgroundColor: "#04081a",
                //border: '2px dashed rgba(47, 225, 185)',
                boxShadow: '10x 10px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Roboto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <span
                    style={{
                        marginTop: '1%',
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 400,
                        color: '#f7f1f0',
                        width: '75%',
                        paddingBottom: '1%',
                        borderBottom: '1px solid rgba(247, 241, 240, 0.1)'
                    }}
                >
                    All Star Index
                </span>
            
                <div 
                    style={{
                        minWidth: 1000,
                        minHeight: 500,
                    }}
                >
                    <Chart options={chartoptions} series={chartData} type="line" width="100%" height="100%"/>
                </div>
            </div>
        </Paper>
    )
}