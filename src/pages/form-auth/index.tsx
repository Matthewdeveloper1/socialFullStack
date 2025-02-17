import React, { useState } from 'react'
import { Login } from '../../features/login';
import { Register } from '../../features/register';

const AuthForm = () => {
  const [selected, setSelected] = useState('login')
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="flex flex-col">
        <div className='max-w-full w-[340px] h-[450px]'>
          <div className='overflow-hidden'>
            <div>
              <div key='login' title='Вход'>
                <Login setSelected={setSelected}/>
              </div>
              <div key='sign-up' title='Регистрация'>
                <Register setSelected={setSelected}/>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default AuthForm
