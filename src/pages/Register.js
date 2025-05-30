import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth} from '../context/AuthContext';

function Register(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const usernameChange = (event) => {
        setUsername(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    const registerUser = async (event) =>{
        event.preventDefault()
        if (username == "" || password == "") {
            return;
        }

        try {
            const userInfo = {
                'username':username,
                'password':password
            }
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo)
            })
            if (response.ok) {
                console.log("successfully created uesrs")
                setError(false)
                navigate("/login");
            }
            else if(response.status == 101){
                console.log("username taken")
                setError(true)
            }
        }
        catch (error){
            console.log(error)
            setError(true)
        }
    };

    return(
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div className="p-6 md:space-y-6 sm:p-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create an account</h2>
                        </div>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                { error ? <div className="text-red-100">Username Taken</div> : null }
                                <label for="email" className="block mb-2 text-sm font-semibold">Username</label>
                                <input type="email" name="email" id="email" onChange={usernameChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-semibold">Password</label>
                                <input type="password" name="password" id="password" onChange={passwordChange} required placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:border-blue-500" required=""/>
                            </div>
                            <button type="submit" onClick={registerUser} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-indigo-600">Create an account</button>
                            <p className="ext-sm/6 text-gray-500 ">
                                Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;