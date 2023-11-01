import { BrowerRoute as Router, Switch, Route, Link } from 'react-router-dom'
import logo from '../assets/image/ArtHub-logos_black.png'
import { useState } from 'react';
import axios from 'axios';
function Signup() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [roleId, setRoleId] = useState("2");
    async function save(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/accounts", {
                username : username,
                lastname: lastname,
                firstname: firstname,
                email: email,
                password: password,
                roleId : roleId,
                isActive : 1
            });
            alert("Employee Registation Successfully");

        } catch (err) {
            alert(err);
        }
    }
  
    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 pt-0  relative isolate px-6 lg:px-8">
            <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
                <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
            </div>
            <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
                <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30" ></div>
            </div>
            <div class="sm:mx-auto sm:w-full sm:max-w-sm"> <img class="mx-auto h-21 w-auto"
                src={logo} alt="ArtHub" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up and start learning
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST">
                    <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                        <div class="mt-2"> <input id="name" name="name" type="text" autocomplete="name" required value={firstname}
                            onChange={(e) => {
                                setFirstname(e.target.value);
                            }}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                        <div class="mt-2"> <input id="name" name="name" type="text" autocomplete="name" required
                        value={lastname}
                        onChange={(e) => {
                            setLastname(e.target.value);
                        }}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                        <div class="mt-2"> <input id="username" name="username" type="text" autocomplete="text" required
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2"> <input id="email" name="email" type="email" autocomplete="email" required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between"> <label for="password"
                            class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div class="mt-2"> <input id="password" name="password" type="password" autocomplete="current-password"
                            required value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 text-center" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between"> <label for="password"
                            class="block text-sm font-medium leading-6 text-gray-900">Which one are you?</label><a href="#"
                                class="font-semibold leading-6 text-purple-600 hover:text-purple-500 text-sm">Learn more</a>
                        </div>
                        <select id="country" name="country" autocomplete="country-name"
                             value={roleId}
                             onChange={(e) => {
                                setRoleId(e.target.value);
                            }}
                            class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6">
                            <option value={1}>Instructor</option>
                            <option value={2}>Student</option>
                        </select> </div>
                    <div> <button type="submit" onClick={save}
                        class="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Sign
                        up</button> </div>
                </form>
                <p class="mt-10 text-center text-sm text-gray-500"> Already have an account? <Link to="/login"><a href="#"
                    class="font-semibold leading-6 text-purple-600 hover:text-purple-500">Login</a></Link> </p>
            </div>
        </div>
    );
};

export default Signup;