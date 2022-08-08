import React from 'react'
import styled from 'styled-components'
import halfEllipse from "../../asset/halfEllipse.png";
import ChoosePlanHolder from "../../asset/chooseplaneHolder.png";
import { ProfileNavBar } from '../dashboard/ProfileNavbar';
import { RightView } from './RightView';
import { LeftView } from './LeftView';


function HomeView() {
  return (
    <div>
        <ProfileNavBar />
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

    @media (max-width: 900px) {
        flex-direction: column;
       
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



