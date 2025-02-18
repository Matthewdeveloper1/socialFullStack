import React, { useContext } from 'react'
import { ThemeContext } from '../theme-provider'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuthenticated } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => { 
    const { toggleTheme} = useContext(ThemeContext)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
      dispatch(logout())
      localStorage.removeItem('token')
      navigate('/auth')
    }

  return (
    <div className='' >
        <div className='flex flex-collumn justify-around pt-8 pb-8'>
        <h1 className='text-xl cursor-pointer'>MathGram</h1>
          <div className='flex flex-collumn gap-8'>
            {/* кнопка смены темы */}
            <button onClick={toggleTheme} className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Logout */}
            {isAuthenticated &&  
             <button onClick={handleLogout} className='flex flex-collumn gap-2 items-center cursor-pointer rounded-sm p-2'>
             Log Out
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
               <path fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clipRule="evenodd" />
               <path fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" clipRule="evenodd" />
             </svg>
           </button>
            }
           
            
          </div>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default Header
