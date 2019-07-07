import React from 'react';
import './faceRecognition.css';


const FaceRecognition = ({imgURL , box}) => {
    return(
		<div className='center ma '>
			<div className='absolute mt2'>
				<img id='inputImage' src={imgURL} alt="" width='500px' height = 'auto'/>
				<div className='bounding-box' style = {{top : box.TopRow , right : box.RightCol , bottom : box.BottomRow , left :box.LeftCol}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;