import { useQuery } from '@tanstack/react-query';
import { fetchPost } from '../api/posts';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
  });
  if (isLoading) return 'Loading...';
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <button onClick={() => navigate('/')}>Back to list posts</button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
