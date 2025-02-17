import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/userSlice'
import { BASE_URL } from '../../constants';
import { Link } from 'react-router-dom';

const Profile = () => {
    const current = useSelector(selectCurrent);


    if(!current){
        return null
    }
    const {name, email, avatarUrl, id} = current


  return (
    <div className='py-4 w-[302px] shadow-lg  p-2'>
      <div className='pb-8 pt-2 px-4 flex-col items-center'>
        <img alt='card profile'
        className='object-cover rounded-xl '
        src={ `${BASE_URL}${avatarUrl}`}
        width={400}
        />
      </div>
      <div>
        <Link to = {`/users/${id}`}>
            <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
            {email}
        </p>
      </div>
    </div>
  )
}

export default Profile
