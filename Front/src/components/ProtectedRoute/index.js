import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ errorPage, targetPage, func }) => {
  const [page, setPage] = useState(<></>);

  const renderPage = () => {
    const token = sessionStorage.getItem('jwt');

    if(!token){
      setPage(errorPage);
      return
    }

    // const decodeToken = jwtDecode(token);
    // const {exp} = decodeToken;

    // if(exp+'000' - Date.now() < 0){
    //   setPage(errorPage)
    //   return
    // }
    setPage(targetPage);
  }

  useEffect(() => {
    renderPage();
  }, [])

  return page;
}

export default ProtectedRoute;