import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {jwtDecode} from 'jwt-decode';
import { useEffect } from "react";

function AuthorizeUser() {
  const { currentUser } = useSelector((state) => state.subSubUser);
  const user = currentUser?.data
    const token = localStorage.getItem('subsumtoken');
    const tokenExist = !!token;
    const navigate = useNavigate()
  
    useEffect(() => {
      if (!tokenExist && !user) {
        toast.error('PLEASE LOGIN');
        navigate('/login')
        return
      } else {
        if(!token){
          navigate('/login')
          return
        }
        const decodedToken = jwtDecode(token);
  
        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          toast.error('Session expiried, Please login');
          navigate('/login')
        }
      }
    }, [currentUser, tokenExist]); 
  
    return tokenExist && user ? <Outlet /> : <Navigate to={'/'} />;
  }

  function AuthorizeAdmin() {
    const { currentUser } = useSelector((state) => state.subSubAdmin);
    const admin = currentUser?.data;

    const token = localStorage.getItem('subsumauthtoken');
    const tokenExist = !!token;
    const navigate = useNavigate()
    
    useEffect(() => {
      if (!tokenExist && !admin) {
        console.log('NO USER');
        toast.error('PLEASE LOGIN');
      } else {
        if(!token){
          navigate('/admin-login')
          return
        }
        const decodedToken = jwtDecode(token);
        
        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          toast.error('Session expiried, Please login');
          navigate('/admin-login')
        }
      }
    }, [currentUser, tokenExist]); 
  
    return tokenExist && admin ? <Outlet /> : <Navigate to={'/'} />;
  }


  export {AuthorizeUser, AuthorizeAdmin}