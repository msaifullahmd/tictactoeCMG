import { Outlet } from 'react-router-dom';
import Game from './tictactoe';

const InGameScreen = () => {

	return (
		<>
			<div>
                
				<Game />
			</div>
			<Outlet />
		</>
	);
};

export default InGameScreen;
