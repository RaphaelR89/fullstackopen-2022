const Notification = ({ message }) => {
	if (message === null) return;

	return (
		<div
			style={{ color: message.toLowerCase().includes('error') && 'red' }}
			className='error'
		>
			{message}
		</div>
	);
};

export default Notification;
