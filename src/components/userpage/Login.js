import logo from '../assets/image/ArtHub-logos_black.png'
import { useState } from 'react';
import { BrowerRoute as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
function Login() {

    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const users = [{ username: "kztoan01@gmail.com", password: "123" }];
    const handleSubmit = (e) => {
        e.preventDefault()
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            setauthenticated(true)
            localStorage.setItem("authenticated", true);
            navigate("/instructordashboard");
        }else{
            alert("Wrong account!");
        }
    };

    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 pt-0">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm"> <img class="mx-auto h-21 w-auto"
                src={logo} alt="ArtHub" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2"> <input id="email" name="email" type="email" autocomplete="email" required value={username} onChange={(e) => setusername(e.target.value)}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between"> <label for="password"
                            class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div class="text-sm"> <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                password?</a> </div>
                        </div>
                        <div class="mt-2"> <input id="password" name="password" type="password" autocomplete="current-password" value={password} onChange={(e) => setpassword(e.target.value)}
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div> <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log
                        in</button> </div>
                </form>
                <p class="mt-10 text-center text-sm text-gray-500"> Not a member? <Link to="/signup" ><a href="#"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up Now</a></Link> </p>
            </div>
        </div>
    );
};

export default Login;