import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
const Home = () => {

    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.loadUser();
    }, [])

    return (
        <div className="grid-2">
            <div>
                Hello
            </div>
            <div>
                Home Page
            </div>
        </div>
    )
}

export default Home;