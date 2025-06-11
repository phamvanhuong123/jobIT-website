import { logOut } from "~/features/candidate.slice"
import { useAppDispatch } from "~/store"
import { useNavigate } from "react-router"


export const handleLogout = (url : string) =>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    localStorage.removeItem('token');
    dispatch(logOut());
    navigate(url)
}