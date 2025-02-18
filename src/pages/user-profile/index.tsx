import React, { useDebugValue, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { resetUser, selectCurrent } from '../../features/userSlice'
import { useGetUserByIDQuery, useLazyCurrentQuery, useLazyGetUserByIDQuery } from '../../app/services/userApi'
import { useFollowUserMutation, useUnFollowUserMutation } from '../../app/services/followApi'
import GoBack from '../../components/go-back'
import { BASE_URL } from '../../constants'
import { current } from '@reduxjs/toolkit'
import ProfileInfo from '../../components/profile-info'
import { formatToClientDate } from '../../utils/format-to-client-date'
import CountInfo from '../../components/count-info'

const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const currentUser = useSelector(selectCurrent)
  const { data } = useGetUserByIDQuery(id ?? '');
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIDQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  useEffect(() => {
    dispatch(resetUser())
  }, []);

  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      if(id){
        data?.isFollowing ?
          await unfollowUser(id).unwrap()
          :  await followUser({followingId: id}).unwrap();

          
        await triggerGetUserByIdQuery(id)

        await triggerCurrentQuery()
      }
    } catch (error) {
      console.error("Ошибка при выполнении действия:", error);
      debugger
      
    }
  }
  if (!data) {
    return null
  }



  return (
    <>
      <GoBack />
      <div className="flex items-center gap-4">
        <div className='flex flex-col items-center text-center space-y-4 p-5 flex-2'>
          <img
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className='border-4 border-white'
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {
              currentUser?.id !== id ? (
                <button
                  className='gap-2 bg-blue-500 text-light-600 text-sm rounded-lg p-2 cursor-pointer '
                  color={data.isFollowing ? 'gray' : 'green'}
                  onClick={handleFollow}
                >
                  {data.isFollowing ? 'Отписаться' : 'Подписаться'}</button>
              ) : (
                <button>
                  Редактировать
                </button>
              )
            }
          </div>
        </div>
        <div className='flex flex-col space-y-4 p-5 flex-1'>
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Местоположение" info={data.location} />
          <ProfileInfo title="Дата рождения" info={formatToClientDate(data.dateOfBirth)} />
          <ProfileInfo title="Обо мне" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
