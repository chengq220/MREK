import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import timeout from '../utils/time';

function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingin, setIsLoggingIn] = useState(false);
    const {login} = useAuth();

    const logInWrap = async (event) =>{
        event.preventDefault();
        setIsLoggingIn(true);
        const res = await login(username, password);
        await timeout(500);
        if (res != ''){
            setError(res);
        }else{
            setError('');

            navigate("/feed");
        }
        setIsLoggingIn(false);
    };

    const usernameChange = (event) => {
        setUsername(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    return(
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className = "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div className="p-6 md:space-y-6 sm:p-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form 
                                onSubmit={logInWrap}
                                className="space-y-6">
                                <div>
                                    <label className="block text-sm/6 font-medium text-gray-900">Username</label>
                                    <div className="mt-2">
                                    <input type="text" name="username" id="username" onChange={usernameChange} autoComplete="username" required 
                                        className={`lock w-full border bg-primary-600 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${error? "border-2 border-red-400" : ""}`} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                    <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                    </div>
                                    <div className="mt-2">
                                    <input type="password" name="password" id="password" onChange={passwordChange} autoComplete="current-password" required 
                                        className={`block w-full border bg-primary-600 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${error? "border-2 border-red-400" : ""}`} />
                                    </div>
                                </div>
                                {isLoggingin?
                                <div className="flex flex-row bg-gray-600 rounded-xl align-items justify-center">
                                    <button 
                                        className="p-4 cursor-not-allowed text-white bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Logging In
                                    </button>
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                    </div>
                                </div>:  
                                <button type="submit" 
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-indigo-600">
                                            Sign in
                                </button>}
                            </form>

                            <p className="text-sm/6 text-gray-500 py-2.5">
                            Not a member? 
                            <Link to= "/register" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"> Register now</Link >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login