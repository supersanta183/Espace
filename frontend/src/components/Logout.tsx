import { useLoggedInContext } from '@/Contexts/LoggedInProvider';

const Logout = () => {
    const { setLoggedIn } = useLoggedInContext();

    const logout = async () => {
        const accessToken = localStorage.getItem('accessToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expirationTime');

        try {
            const response = await fetch('http://localhost:5064/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            // Check if the response body is empty
            const text = await response.text();
            const result = text ? JSON.parse(text) : {};

            console.log(result);
            setLoggedIn(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <button className='btn btn-ghost' onClick={logout}>
            Logout
        </button>
    );
};

export default Logout;