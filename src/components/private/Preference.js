import '../../css/tailwind.css';
import { useState, useEffect } from 'react';
import { useAuth} from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Preference() {
    const navigate = useNavigate();
    const {user, token, login, logout, verify} = useAuth();

    useEffect(() => {
        if(!verify){
            navigate("/");
        }
    }, [verify]);

    return (
        <div class="flex h-screen">
            <div class="m-auto">
                <h1>Preferences</h1>
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Genre
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Genre"/>
                        </div>
                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Artist
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Artist"/>
                        </div>
                        <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Setup Preference
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Preference;
