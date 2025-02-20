import React, { useState } from 'react'
import {Tabs, Tab} from "@heroui/tabs";
import { Login } from '../../features/login';
import { Register } from '../../features/register';

const Auth = () => {
  const [selected, setSelected] = useState('login')
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="flex flex-col bg-color-red-500">
        <div className='max-w-full w-[340px] h-[450px]'>
          <div className='overflow-hidden'>
            <Tabs 
            fullWidth
            size='md'
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
            >
              <Tab key='login' title='Вход'>
                <Login setSelected={setSelected}/>
              </Tab>
              <Tab key='sign-up' title='Регистрация'>
                <Register setSelected={setSelected}/>
              </Tab>
            </Tabs>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Auth
