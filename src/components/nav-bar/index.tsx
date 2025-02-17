import React from 'react'
import { NavButton } from '../nav-button'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupsIcon from '@mui/icons-material/Groups';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export const NavBar = () => {
  return (
    <div>
      <ul className="flex flex-col gap-5">
        <li className='g-5'>
          <NavButton href='/'>
             <NewspaperIcon/>Posts
          </NavButton>
        </li>
        <li>
          <NavButton href='following'>
             <PermIdentityIcon/>Following
          </NavButton>
        </li>
        <li>
          <NavButton href='followers' >
            <GroupsIcon/> Followers
          </NavButton>
        </li>
      </ul>
    </div>
  )
}
