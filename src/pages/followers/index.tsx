import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/userSlice';
import { Link } from 'react-router-dom';
import User from '../../components/user';

const Followers = () => {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map(user => (
        <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
          <div className='block'>
            <User
              name={user.follower.name}
              avatarUrl={user.follower.avatarUrl}
              description={user.follower.email}
            />
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <h1>Нет подписчиков</h1>
  );
}

export default Followers;