import React from "react";
import styled from "styled-components";
import dang from "../image/cat_hungry.png";

const Wrap = styled.div`
    width:100vw; 
    height:100vh;
    display:grid;
    justify-content:center;
    align-items:center;
`;

const Senten = styled.div`
    font-size:12px;
    text-align:center;
    margin-top:10px;
`

const Gogo = styled.span`
    cursor:pointer;
    color: blue;
    margin-left:10px;
    
`
const Try = ({history}) => {

    return (
        <Wrap>
            <div>
                <img alt="loading" src={dang} height={100} width={100} />
                <Senten>Issues on server now. Please re-connect to website.
                    <Gogo onClick={()=>history.goBack()}>Go Back</Gogo>

                </Senten>
            </div>
        </Wrap>
    )
}

export default Try