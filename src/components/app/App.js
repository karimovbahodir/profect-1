import { Routes, Route } from 'react-router-dom'
import { useState } from "react";
import Info from "../firstPage/components/info/Info";
import List from "../firstPage/components/list/List";
import Random from "../firstPage/components/random/Random";
import ErrorBoundary from "../firstPage/components/errorBoundary/ErrorBoundary";
import { ModalProvider } from "../firstPage/components/context";
import RecipesList from '../secondPage/recipesList/RecipesList';
import RecipesAddForm from '../secondPage/recipesAddForm/RecipesAddForm';
import RecipesFilters from '../secondPage/recipesFilters/RecipesFilters';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MainPage from '../mainPage/MainPage';
import './App.css';



const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);
    return (
        <div className="container">
            <ModalProvider>
                <Header />
                <main className="app">
                    <Routes>
                        <Route path='/' element={<MainPage />}/>
                        <Route
                            path='firstPage'
                            element={<div className="first__content">
                                <Random />
                                <ErrorBoundary>
                                    <div className="app__content">
                                        <List onCharSelected={(id) => setSelectedChar(id)} />
                                        <Info charId={selectedChar} />
                                    </div>
                                </ErrorBoundary>
                            </div>} />
                        <Route
                            path='secondPage'
                            element={<div className="second__content">
                                <RecipesList />
                                <div className="content__interactive">
                                    <RecipesAddForm />
                                    <RecipesFilters />
                                </div>
                            </div>} />

                    </Routes>
                </main>
                <Footer />
            </ModalProvider>
        </div>
    )
}

export default App;