import React from 'react'
import { BASE_URL } from '../../constants';


type Props = {
    name: string;
    avatarUrl: string;
    description?: string;
    className?: string;

}
const User: React.FC<Props> = ({
    name = '',
    avatarUrl = '',
    description = '',
    className = ''
}) => {
    return (
        <div className={`flex items-center space-x-4 p-4 border rounded-lg shadow-sm ${className}`}>
            <img
                src={`${BASE_URL}${avatarUrl}`}
                alt={name}
                className="w-12 h-12 rounded-full object-cover"
            />
            <div>
                <h2 className="text-lg font-semibold">{name}</h2>
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
        </div>
    )
}

export default User
