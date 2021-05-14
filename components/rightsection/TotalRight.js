import React, { useState, useEffect } from 'react'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Slide from '@material-ui/core/Slide';

import Drawer from '@material-ui/core/Drawer';

import styled, { css } from "styled-components";

import { FaUser } from 'react-icons/fa';

import TotalUser from './TotalUser'

import { Auth } from 'aws-amplify';

const RightSide = styled.div`
    background-color: #01030C;
    z-index: 3;
    width: 10vh;
`;

const RightExpanded = styled.div`
    //height: 25vh;
    background-color: #00020B;
    z-index: 3;
    width: ${props => (!props.collapsed ? "40vh" : "0vh")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: width 0.15s linear;
    border-radius: 10px;
    box-shadow: ${props => (!props.collapsed ? "-15px 0px 10px 1px rgba(0, 0, 0, 0.1);" : null)};
`;

export default function TotalRight()
{

    const [collapsed, setCollapsed] = useState(true)

    const handleExpand = (e) => {
        e.preventDefault()
        setCollapsed(!collapsed)
    }

    const handleClickAway = (e) => {
        e.preventDefault()
        setCollapsed(true)
    }

    

    return(
        <ClickAwayListener onClickAway={handleClickAway} >
            <div
                style={{
                    display: 'flex',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    height: '25vh',
                }}
            >
                <RightExpanded collapsed={collapsed} >
                    {!collapsed ? 
                    (
                        <TotalUser/>
                    )
                    : null
                    }
                </RightExpanded>

                <RightSide>
                    <IconButton 
                        style={{
                            position: 'relative',
                            top: 50,
                            left: '50%',
                            transform: 'translate(-50%, 0)'
                        }} 
                        onClick={handleExpand}
                    >
                        <MenuIcon color="primary" style={{ fontSize: 40 }} />
                    </IconButton>

                    {/* <IconButton 
                        style={{
                            position: 'relative',
                            top: 50,
                            left: '50%',
                            transform: 'translate(-50%, 0)'
                        }} 
                        onClick={handleExpand}
                    >
                        <FaUser color="rgb(47, 225, 185)" size={30}/>
                    </IconButton> */}
                </RightSide>
            </div>
        </ClickAwayListener>
    )
}