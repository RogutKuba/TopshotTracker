import React from 'react'
import { useRouter } from 'next/router'

import Header from './Header'
import CenterSection from './CenterSection'

import TotalIndex from './indextracker/TotalIndex'
import TotalDeals from './deals/TotalDeals'
import TotalLogin from './loginpage/TotalLogin'
import TotalSignUp from './loginpage/TotalSignUp'
import TotalForgot from './loginpage/TotalForgot'

import AccountValue from './account/AccountValue'

import TotalRight from './rightsection/TotalRight'

export default function AppHome()
{

    const router = useRouter()


    return(
        <div style={{
            zIndex: -1,
            position: 'absolute',
            //backgroundColor: "#141414",
            //background: 'linear-gradient(#121212, #141414)',
            backgroundColor: "#020512",
            width: '100%',
            paddingBottom: '17.5%',
            scrollbarWidth: 0,
            //minHeight: '100vh',
        }} >
            <img 
                src="/wavetopblue2.svg"
                style={{position: 'absolute', top: 0, width: '100%', transform: "rotateX(180deg)", zIndex: -1}}
                unselectable="on"
            >
            </img>

            <Header/>
            
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                
                { router.pathname === "/" || router.pathname === "/deals" ? 
                (
                    <TotalDeals/>
                ) : router.pathname === "/account" ? 
                (
                    <AccountValue/>
                ) :  router.pathname === "/login" ? 
                (
                    <TotalLogin/>
                ) : router.pathname === "/signup" ? 
                (
                    <TotalSignUp/>
                ): router.pathname === "/forgotpassword" ? 
                (
                    <TotalForgot/>
                )
                : null
                }

                <TotalRight/>
            </div>

            <img 
                src="/waveblue.svg"
                style={{ position:'absolute', bottom: 0, zIndex: -1 }}
                unselectable="on"
            >
            </img>
        </div>
    )
}