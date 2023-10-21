import { useQuery } from '@tanstack/react-query';
import AddPost from '../components/AddPost';
import { fetchPosts } from '../api/posts';
import { useNavigate } from 'react-router-dom';

const PostLists = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  if (isLoading) return 'Loading...';
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <AddPost />
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: '1px solid black',
            marginTop: '10px',
            paddingLeft: '10px',
            paddingBottom: '10px',
            backgroundColor: 'lightgray',
          }}
        >
          <h4
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post.title}
          </h4>
          <button onClick={() => navigate(`/post/${post.id}/edit`)}>
            Edit
          </button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostLists;
