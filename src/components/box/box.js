import React from 'react';
import './box.css';


const Box = ({box}) => {
    console.log("BOX",box);
    return(
        <div className='bounding-box' style = {{top : box.TopRow , right : box.RightCol , bottom : box.BottomRow , left :box.LeftCol}}>
        </div>
	);
}

export default Box;