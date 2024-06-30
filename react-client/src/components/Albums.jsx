import React, { useState, useEffect } from 'react';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(1);
  const photosPerPage = 5;
  const albumsApiUrl = 'http://localhost:3000/albums'; // Replace with your JSON server URL
  const photosApiUrl = 'http://localhost:3000/photos'; // Replace with your JSON server URL for photos

  // Get the current user ID from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser ? Number(currentUser.id) : null;

  useEffect(() => {
    if (currentUserId !== null) {
      fetch(albumsApiUrl)
        .then(response => response.json())
        .then(data => setAlbums(data.filter(album => Number(album.userId) === currentUserId)))
        .catch(error => console.error('Error fetching albums:', error));
    }
  }, [currentUserId]);

  const fetchPhotos = (albumId, page = 1) => {
    fetch(`${photosApiUrl}?albumId=${albumId}&_page=${page}&_limit=${photosPerPage}`)
      .then(response => response.json())
      .then(data => {
        if (page === 1) {
          setPhotos(data); // reset photos for a new album
        } else {
          setPhotos(prevPhotos => [...prevPhotos, ...data]);
        }
      })
      .catch(error => console.error('Error fetching photos:', error));
  };

  const loadMorePhotos = () => {
    const nextPage = currentPhotoPage + 1;
    setCurrentPhotoPage(nextPage);
    fetchPhotos(selectedAlbumId, nextPage);
  };

  const handleViewPhotos = (albumId) => {
    setSelectedAlbumId(albumId);
    setCurrentPhotoPage(1);
    fetchPhotos(albumId, 1);
  };

  const addAlbum = (title) => {
    const newAlbum = {
      title,
      userId: currentUserId, // Set the userId of the new album to the current user's ID
    };
    fetch(albumsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAlbum)
    })
    .then(response => response.json())
    .then(album => setAlbums([...albums, album]))
    .catch(error => console.error('Error adding album:', error));
  };

  const deleteAlbum = async (id) => {
    try {
      const response = await fetch(`${albumsApiUrl}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete album with id: ${id}`);
      }
      setAlbums(albums.filter(album => album.id !== id));
      console.log(`Successfully deleted album with id: ${id}`);
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const updateAlbum = (id, updatedAlbum) => {
    fetch(`${albumsApiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedAlbum)
    })
    .then(response => response.json())
    .then(album => setAlbums(albums.map(a => (a.id === id ? album : a))))
    .catch(error => console.error('Error updating album:', error));
  };

  const addPhoto = (albumId, title, url, thumbnailUrl) => {
    const newPhoto = {
      albumId,
      title,
      url,
      thumbnailUrl,
    };
    fetch(photosApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPhoto)
    })
    .then(response => response.json())
    .then(photo => setPhotos([...photos, photo]))
    .catch(error => console.error('Error adding photo:', error));
  };

  const deletePhoto = async (id) => {
    try {
      const response = await fetch(`${photosApiUrl}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete photo with id: ${id}`);
      }
      setPhotos(photos.filter(photo => photo.id !== id));
      console.log(`Successfully deleted photo with id: ${id}`);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const updatePhoto = (id, updatedPhoto) => {
    fetch(`${photosApiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPhoto)
    })
    .then(response => response.json())
    .then(photo => setPhotos(photos.map(p => (p.id === id ? photo : p))))
    .catch(error => console.error('Error updating photo:', error));
  };

  const searchResults = albums.filter(album => {
    const query = searchQuery.toLowerCase();
    return album.title.toLowerCase().includes(query) || album.id.toString().includes(query);
  });

  return (
    <div>
      <h1>Albums</h1>
      <button onClick={() => addAlbum(prompt('New album title'))}>Add Album</button>
      <div>
        <input 
          type="text" 
          placeholder="Search by ID or title..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      <ul>
        {searchResults.map((album, index) => (
          <li key={album.id}>
            {index + 1}. ID: {album.id}, Title: {album.title}
            <button onClick={() => handleViewPhotos(album.id)}>
              View Photos
            </button>
            <button onClick={() => deleteAlbum(album.id)}>Delete</button>
            <button onClick={() => updateAlbum(album.id, { ...album, title: prompt('New title', album.title) })}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      {selectedAlbumId && (
        <div>
          <h2>Photos in Album</h2>
          <div>
            {photos.map(photo => (
              <div key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
                <button onClick={() => deletePhoto(photo.id)}>Delete</button>
                <button onClick={() => updatePhoto(photo.id, { ...photo, title: prompt('New title', photo.title), url: prompt('New URL', photo.url), thumbnailUrl: prompt('New thumbnail URL', photo.thumbnailUrl) })}>
                  Edit
                </button>
              </div>
            ))}
          </div>
          <button onClick={loadMorePhotos}>Load More Photos</button>
          <button onClick={() => addPhoto(selectedAlbumId, prompt('Photo title'), prompt('Photo URL'), prompt('Photo thumbnail URL'))}>Add Photo</button>
        </div>
      )}
    </div>
  );
};

export default Albums;
