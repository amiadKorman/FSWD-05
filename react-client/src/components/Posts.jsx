import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostContent, setSelectedPostContent] = useState(null);
  const [comments, setComments] = useState([]);
  const apiUrl = 'http://localhost:3000/posts'; // Replace with your JSON server URL
  const commentsApiUrl = 'http://localhost:3000/comments'; // Replace with your JSON server URL for comments

  // Get the current user ID from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser ? Number(currentUser.id) : null;

  useEffect(() => {
    if (currentUserId !== null) {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setPosts(data.filter(post => Number(post.userId) === currentUserId)))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [currentUserId]);

  const addPost = (title, content) => {
    const newPost = {
      title,
      body: content,
      userId: currentUserId, // Set the userId of the new post to the current user's ID
    };
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(post => setPosts([...posts, post]))
    .catch(error => console.error('Error adding post:', error));
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete post with id: ${id}`);
      }
      setPosts(posts.filter(post => post.id !== id));
      console.log(`Successfully deleted post with id: ${id}`);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const updatePost = (id, updatedPost) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(post => setPosts(posts.map(p => (p.id === id ? post : p))))
    .catch(error => console.error('Error updating post:', error));
  };

  const fetchComments = (postId) => {
    fetch(`${commentsApiUrl}?postId=${postId}`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  const addComment = (postId, comment) => {
    const newComment = {
      postId,
      body: comment,
      userId: currentUserId, // Set the userId of the new comment to the current user's ID
    };
    fetch(commentsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
    .then(response => response.json())
    .then(comment => setComments([...comments, comment]))
    .catch(error => console.error('Error adding comment:', error));
  };

  const deleteComment = async (id) => {
    try {
      const response = await fetch(`${commentsApiUrl}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete comment with id: ${id}`);
      }
      setComments(comments.filter(comment => comment.id !== id));
      console.log(`Successfully deleted comment with id: ${id}`);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const updateComment = (id, updatedComment) => {
    fetch(`${commentsApiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedComment)
    })
    .then(response => response.json())
    .then(comment => setComments(comments.map(c => (c.id === id ? comment : c))))
    .catch(error => console.error('Error updating comment:', error));
  };

  const searchResults = posts.filter(post => {
    const query = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(query) || post.id.toString().includes(query);
  });

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <input 
          type="text" 
          placeholder="Search by ID or title..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      <ul>
        {searchResults.map((post, index) => (
          <li key={post.id} style={{ fontWeight: post.id === selectedPostId ? 'bold' : 'normal' }}>
            {index + 1}. ID: {post.id}, Title: {post.title}
            <button onClick={() => {
              setSelectedPostId(post.id);
              setSelectedPostContent(post.body);
            }}>
              Select
            </button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <button onClick={() => updatePost(post.id, { ...post, title: prompt('New title', post.title), body: prompt('New content', post.body) })}>
              Edit
            </button>
            {post.id === selectedPostId && (
              <button onClick={() => fetchComments(post.id)}>
                Show Comments
              </button>
            )}
          </li>
        ))}
      </ul>
      {selectedPostId && (
        <div>
          <h2>Selected Post Content</h2>
          <p>{selectedPostContent}</p>
          <input
            type="text"
            placeholder="Add a comment"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addComment(selectedPostId, e.target.value);
                e.target.value = '';
              }
            }}
          />
          <h3>Comments</h3>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                {comment.body}
                {comment.userId === currentUserId && (
                  <>
                    <button onClick={() => updateComment(comment.id, { ...comment, body: prompt('New comment', comment.body) })}>
                      Edit
                    </button>
                    <button onClick={() => deleteComment(comment.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={() => addPost(prompt('New post title'), prompt('New post content'))}>Add Post</button>
    </div>
  );
};

export default Posts;
