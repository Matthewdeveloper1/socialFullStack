import type React from 'react';
import { useState } from 'react'
import { useLikePostMutation, useUnLikePostMutation } from '../../app/services/likesApi';
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postsApi';
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/userSlice';
import User from '../user';
import { formatToClientDate } from '../../utils/format-to-client-date';
import Typography from '../typography';
import MetaInfo from '../meta-info';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { ErrorMessage } from '../error-message';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { hasErrorField } from '../../utils/has-error-field';

type Props ={
    avatarUrl: string;
    name: string;
    authorId: string;
    content: string;
    commentId?: string;
    likesCount?: number;
    commentCount?: number;
    createdAt?: Date;
    id?: string;
    cardFor: 'comment' | 'post' | 'current-post'
    likedByUser: boolean;
} 

const Card: React.FC<Props> = ({
    avatarUrl = '',
    name = '',
    authorId = '',
    content = '',
    commentId = '',
    likesCount = 0,
    commentCount = 0,
    createdAt,
    id = 'string',
    cardFor = 'post',
    likedByUser= false
}) => {
    const [likePost] = useLikePostMutation();
    const [unlikePOst] = useUnLikePostMutation();
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();
    const [deletePost, deletePostStatus] = useDeletePostMutation();
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrent)

    const refetchPosts = async () => {
        switch(cardFor){
            case 'post':
                await triggerGetAllPosts().unwrap();
                break
            case 'current-post':
                await triggerGetAllPosts().unwrap();
                break
            case 'comment':
                await triggerGetPostById(id).unwrap();
                break
            default:
                throw new Error('Неверный аргумент cardFor')
        }
    }

    const handleDelete = async () => {
        try {
            switch (cardFor){
                case 'post':
                    await deletePost(id).unwrap();
                    await refetchPosts()
                    break
                case 'current-post':
                    await deletePost(id).unwrap();
                    navigate('/');
                    break
                case 'comment':
                    await deleteComment(id).unwrap();
                    await refetchPosts();
                    break
                default: 
                    throw new Error('Неверный аргумент cardFor')
            }
        } catch (error) {
            if(hasErrorField(error)) {
                setError(error.data.error)
            } else {
                setError(error as string)
            }
        }
    }
    
  return (
    <div className='mb-5 shadow-lg border-1 border-[#C9C0BB] rounded-md p-4 w-[630px] dark:border-[10100f] card-border'>
        {
            authorId === currentUser?.id && (
                <div className="cursor-pointer flex justify-end" onClick={handleDelete}>
                    {
                        deletePostStatus.isLoading || deleteCommentStatus.isLoading ? '...loading' : <DeleteOutlineIcon className='absolute'/>
                    }
                </div>
            )
        }
      <div className='justify-between items-center'>
        <Link to={`/users/${authorId}`}>
            <User
            name={name}
            className='text-small font-semibold leading-none text-default-600 items-start'
            avatarUrl={avatarUrl}
            description={ createdAt && formatToClientDate(createdAt)}
            />
        </Link>
        
      </div>
      {/* body */}
        <div className="px-3 py-2 mb-5">
            <Typography>{ content }</Typography>
        </div>
        {
            cardFor !== 'comment' && (
                <div className="gap-3">
                    <div className="flex gap-5 items-center">
                        <div>
                            <MetaInfo
                            count={likesCount}
                            />
                        </div>
                        <Link to={`/posts/${id}`}>
                            <MetaInfo count={commentCount}
                            />
                        </Link>
                    </div>
                    <ErrorMessage error = {error}/>
                </div>
            )
        }
    </div>
  )
}

export default Card
