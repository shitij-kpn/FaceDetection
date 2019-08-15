import React from 'react';
import './faceRecognition.css';


const FaceRecognition = ({imgURL , box}) => {
    return(
		<div className='center ma '>
			<div className='absolute mt2'>
				<img id='inputImage' src={imgURL} alt="" width='500px' height = 'auto'/>
				<div className='bounding-box' style = {{top : box[1].TopRow , right : box[1].RightCol , bottom : box[1].BottomRow , left :box[1].LeftCol}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;