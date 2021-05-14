import React from 'react'


export default function Background()
{
    return(
        <div style={{
            position: 'absolute',
            backgroundColor: "#465b9c",
            width: '100%',
            minHeight: '100vh',
            zIndex: -1,
        }} >
            <img 
                src="/wavetop2.svg"
                style={{position: 'absolute', top: 0, width: '100%', transform: "rotateX(180deg)"}}
            >
            </img>

            <div style={{
            marginLeft: 30,
            display: 'flex',
            alignItems: 'center'
        }} >

            <div
                style={{
                    marginLeft: 25,
                    fontWeight: 750,
                    fontSize: 20,
                }}
            >
                    Header
                </div> 
            </div>

            {/*
            <img 
                src="/blob1.svg"
                style={{position: 'absolute', top: 0, left: '5%', width: '30%'}}
            >
            </img>

            <img 
                src="/blob3.svg"
                style={{position: 'absolute', top: '3.5%', left: '7%', width: '22.5%'}}
            >
            </img>
            */}

            <img 
                src="/wave.svg"
                style={{ position:'absolute', bottom: 0 }}
            >
            </img>
        </div>
    )
}