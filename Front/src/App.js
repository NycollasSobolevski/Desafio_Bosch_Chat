import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbarComponent';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound'
import {  CounterProvider } from './Context/Counter';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/Home';
import PopupComponent from './components/popupComponent';

function App() {

    document.title = "Bosch Chat"
    
    return (
        <>
            <CounterProvider>
                <NavBar />
                <Routes>
                    <Route path='/' element={
                        <ProtectedRoute
                            errorPage={<LoginPage/>}
                            targetPage={ <MainPage/> }
                        />
                    }/>
                    <Route path='/main' element={
                        <ProtectedRoute
                            errorPage={<LoginPage/>}
                            targetPage={ <NavBar/> }
                        />
                    }/> 
                    <Route path='*' element={<NotFoundPage/>} />
                    <Route path='accessDenied' element={<></>} />
                </Routes>
            </CounterProvider>
        </>
    );
}

export default App;