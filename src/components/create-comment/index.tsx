
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../error-message';
import SendIcon from '@mui/icons-material/Send';
import SmsIcon from '@mui/icons-material/Sms';
import CreateIcon from '@mui/icons-material/Create';
import { useParams } from 'react-router-dom';
import { useCreateCommentMutation } from '../../app/services/commentsApi';
import { useGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postsApi';

const CreateComment = () => {
    const {id} = useParams<{ id: string }>();
    const [CreateComment] = useCreateCommentMutation();
    const [getPostById] = useLazyGetPostByIdQuery();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue
    } = useForm()


    const error = errors?.post?.message as string;


    const onSubmit = handleSubmit(async (data) => {
        try {
            if (id) {
                await CreateComment({ content: data.comment, postId: id }).unwrap();
                setValue('comment', '');
                await getPostById(id).unwrap()
            }
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <form className='flex-grow' onSubmit={onSubmit}>
            <Controller
                name='comment'
                control={control}
                defaultValue=''
                rules={{
                    required: 'обязательное поле'
                }}
                render={({ field }) => (
                    <textarea
                        {...field}
                        className='create-input bg-white focus:outline-none text-black p-2 br-2 resize-none rounded-lg w-[100%] shadow-lg border-1 mb-2 border-[#C9C0BB] rounded-lg'
                        placeholder='Type your comment...'
                    >

                    </textarea>
                )}
            />

            {errors && <ErrorMessage error={error} />}

            <button className='flex-end flex items-center gap-2 bg-green-500 p-2 rounded-lg '>
                Добавить комментарий <CreateIcon className='font-10' />
            </button>
        </form>
    )
}

export default CreateComment
