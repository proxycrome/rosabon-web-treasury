import React from 'react'
import styled from 'styled-components'
import halfEllipse from "../../../asset/halfEllipse.png";
import ChoosePlanHolder from "../../../asset/chooseplaneHolder.png";
import { ProfileNavBar } from '../../dashboard/ProfileNavbar';
import { RightView } from './RightView';
import { LeftView } from './LeftView';


function HomeView() {
  return (
    <div>
        <ProfileNavBar>
            <NavTitle>
                <h2>Hello Ekiyee!</h2>
                <span>Welcome back</span>
            </NavTitle>
        </ProfileNavBar> 
        <Wrapper>
            <div className='right-content'>
                <RightView />
            </div>
            <div className='left-content'>
                <LeftView />
            </div>
        </Wrapper>
    </div>
    
  )
}
export default HomeView

const Wrapper = styled.div `
    display: flex;
    
    width: 100%;
  
   @media (min-width: 900px) {
        flex-direction: row;
        .right-content {
            width: 60%;
        }
        .left-content {
            width: 40%;
        }
    }

    @media (max-width: 899px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .right-content {
            width: 100% !important;
            display: flex;
            align-items: center;
            justify-content: center;

        }
        .left-content {
            width: 100% !important;
        }
    }
   
`
const NavTitle = styled.div`
    display: flex;
    flex-direction: column;
    h2, span{
        text-align: left;    
    }
    @media (max-width: 500px) {
        h2, span {
            display: none;
        }  
    }
`


