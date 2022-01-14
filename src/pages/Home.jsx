import React from 'react';

import TodoList from './../components/Todo/TodoList';
import Header from './../components/UI/Header';
import Footer from './../components/UI/Footer';

const Home = () => {

    return <>
        <Header />
        <TodoList />
        <Footer />
    </>

}

export default Home;