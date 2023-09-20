import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbarComponent';
import NotFoundPage from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/Home';

function App() {

    document.title = "Bosch Chat"
    
    return (
        <>
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
        </>
    );
}

export default App;