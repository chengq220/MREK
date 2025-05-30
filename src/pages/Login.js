import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth} from '../context/AuthContext';
import Loading from '../components/Loading';

function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login, isLoading} = useAuth();

    useEffect(() => {}, [isLoading])

    const logInWrap = async () =>{
        const res = await login(username, password)
        if (res != 1){
            setError(res);
        }
        else{
            navigate("/feed");
        }
    };

    const usernameChange = (event) => {
        setUsername(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    const errorDisplay = () => {
      switch(error) {
        case 101: return <div className="text-red-100">Incorrect username/password</div>;
        case 102: return <div className="text-red-100">Empty username or password</div>;
        case 103: return <div className="text-red-100">Error connecting to the server</div>;
        default:  return null;
      }
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
                            {errorDisplay()}
                            <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label for="email" className="block text-sm/6 font-medium text-gray-900">Username</label>
                                <div className="mt-2">
                                <input type="email" name="email" id="email" onChange={usernameChange} autocomplete="email" required className="block w-full border bg-primary-600 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                                </div>
                                <div className="mt-2">
                                <input type="password" name="password" id="password" onChange={passwordChange} autocomplete="current-password" required className="block w-full border bg-primary-600 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" 
                                        onClick={logInWrap}
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-indigo-600">
                                            Sign in
                                </button>
                            </div>
                            {isLoading ? <Loading /> : null}
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