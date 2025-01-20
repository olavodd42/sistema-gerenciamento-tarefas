import React, { useState } from "react";
import axios from 'axios';

const Cadastro = ()=> {
    const onSubmit = async event => {
        event.preventDefault();

        await axios.post('http://localhost:4000/api/user/register', {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
    }
    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Cadastro</h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="loginEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="loginEmail"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                />
                            </div>
                            <div>
                                <label htmlFor="loginPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha:</label>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="loginPassword"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirme a senha:</label>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50
                                    focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                    required="" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Eu aceito os <a class="font-medium text-primary-600 
                                    hover:underline dark:text-primary-500" href="#">Termos e Condições</a></label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium
                                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Criar uma conta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cadastro;