import React from 'react'
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../../app/services/postsApi'
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../error-message';
import SendIcon from '@mui/icons-material/Send';
import SmsIcon from '@mui/icons-material/Sms';
import CreateIcon from '@mui/icons-material/Create';

const CreatePost = () => {
    const [ CreatePost ] = useCreatePostMutation();
    const [triggerAllPosts] = useLazyGetAllPostsQuery();

    const {
        handleSubmit,
        control,
        formState: {errors},
        setValue
    } = useForm()


    const error = errors?.post?.message as string;


    const onSubmit = handleSubmit(async (data) => {
        try {
            await CreatePost({content: data.post}).unwrap();
            setValue('post', '');
            await triggerAllPosts().unwrap();
        } catch (error) {
            console.log(error)
        }
    })
    return (
    <form className='flex-grow' onSubmit={onSubmit}>
        <Controller
         name='post'
         control={control}
         defaultValue=''
         rules={{
            required: 'обязательное поле'
         }}
         render={({field}) => (
            <textarea
            {...field}
            className=' bg-white focus:outline-none text-black p-2 br-2 resize-none rounded-lg w-[100%] shadow-lg border-1 mb-2 border-[#C9C0BB] rounded-lg'
            placeholder='type your message here...'
            >

            </textarea>
         )}
        />

        {errors && <ErrorMessage error ={ error }/>}

        <button className='flex-end flex items-center gap-2 bg-green-500 p-2 rounded-lg cursor-pointer'>
                Добавить пост <CreateIcon className='font-10'/>
        </button>
    </form>
  )
}

export default CreatePost
