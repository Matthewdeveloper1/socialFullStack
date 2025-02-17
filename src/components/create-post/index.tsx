import React from 'react'
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../../app/services/postsApi'
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../error-message';

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
    <form className='felx-grow ' onSubmit={onSubmit}>
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
            className='mb-5 w-[100%] bg-color-white'
            >

            </textarea>
         )}
        />

        {errors && <ErrorMessage error ={ error }/>}

        <button className='flex-end'>
            Добавить пост
        </button>
    </form>
  )
}

export default CreatePost
