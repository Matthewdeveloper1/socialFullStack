import React from 'react'
import { NavButton } from '../nav-button'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupsIcon from '@mui/icons-material/Groups';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export const NavBar = () => {
  return (
    <div>
      <ul className="flex flex-col gap-5">
        <li className='g-5  hover:text-gray-500'>
          <NavButton href='/'>
             <NewspaperIcon/>Posts
          </NavButton>
        </li>
        <li  className='hover:text-gray-500'>
          <NavButton href='following'>
             <PermIdentityIcon/>Following
          </NavButton>
        </li>
        <li  className='hover:text-gray-500'>
          <NavButton href='followers'>
            <GroupsIcon/> Followers
          </NavButton>
        </li>
      </ul>
    </div>
  )
}
