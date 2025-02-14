import React, { useContext } from 'react'
import { ThemeContext } from '../theme-provider'

const Header = () => { 
    const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <div >
        <div>
            <p className="font-bold text-inherit">Social Network</p>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default Header
