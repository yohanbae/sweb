import React from "react";
import styled from "styled-components";
import dang from "../image/dang_ani.gif";

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

const Loading = () => {
    return (
        <Wrap>
            <div>
                <img alt="loading" src={dang} height={100} width={100} />
                <Senten>
                    now loading...
                </Senten>
            </div>
        </Wrap>
    );
}
export default Loading;