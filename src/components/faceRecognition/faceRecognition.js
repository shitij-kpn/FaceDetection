import React from 'react';
import Box from '../box/box'




const FaceRecognition = ({imgURL , box}) => {
	let boxes = box.map(face => {
		return <Box box={face}/>
	})
	return(
		<div className='center ma '>
			<div className='absolute mt2'>
				<img id='inputImage' src={imgURL} alt="" width='500px' height = 'auto'/>
				{boxes}
			</div>
		</div>
	);
}

export default FaceRecognition;