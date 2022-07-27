import React from 'react'
import styled from 'styled-components'
import * as mdb from 'mdb-ui-kit';
import { Link } from "react-router-dom";


export function ProfileNavBar() {
    return (
      <WrappeNavBar>
          <div className=''>
            <div className='profile_nav'>
                <ul className=''>
                    <li className='profile_nav_bel'><i class="fas fa-bell"></i></li>
                    <li><i class="fas fa-angle-down"></i></li>
                    <li>ekiyee bilaowei</li>
                    <li>
                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" style={{width: '50px'}} alt="Avatar" />
                    </li>
                </ul>
            </div>
            
          </div>
      </WrappeNavBar>
      
    )
  }

const WrappeNavBar = styled.div `
    height: 101px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(98, 134, 154, 0.12);
    text-align: right;
    padding-right: 4rem;
    margin-bottom: 20px;

    .profile_nav {
        display: flex ;
        justify-content: end;
        align-items: center;
        padding-top: 1.5rem;
    }
    .profile_nav_bel {
        padding-right: 100px;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex ;
        justify-content: center;
        align-items: center;
    }
   li{
        padding-left: 15px;
    }
    
   .fa-bell {
        font-size: 34px;
        
    }
`

