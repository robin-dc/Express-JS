// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Get all artists
app.get('/artists', (req, res) => {
  try{
    const artists = getAllArtists()
    res.status(200).send(artists);
  }
  catch(err){
    res.status(400).send("Error: " + err.message)
  }
})

// Get a specific artist's details based on artistId
app.get('/artists/:artistId', (req, res) => {
  try{
    const artistId = req.params.artistId
    if(artistId) {
      const artist = getArtistByArtistId(artistId)
      res.status(200).json(artist);
    }
    else{
      res.status(404).send("Artists Id not found")
    }
  }
  catch(err){
    res.status(400).send("Error: " + err.message)
  }
})

// Edit a specified artist by artistId
app.patch('/artists/:artistId', (req, res) => {
  try {
    const artistId = req.params.artistId
    const newName = req.body
    if(artistId) {
      const artist = editArtistByArtistId(artistId, newName)
      res.status(200).json(artist);
    }
    else{
      res.status(404).send("Artists Id not found")
    }
  }
  catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

// Delete a specified artist by artistId
app.delete('/artists/:artistId', (req, res) => {
  try {
    const artistId = req.params.artistId
    if(artistId) {
      deleteArtistByArtistId(artistId)
      res.status(200).send({
        "message": "Successfully deleted"
      });
    }
    else{
      res.status(404).send("Artists Id not found")
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

// Get all albums of a specific artist based on artistId
app.get('/artists/:artistId/albums', (req, res) => {
  try {
    const artistId = req.params.artistId
    if(artistId) {
      const albums = getAlbumsByArtistId(artistId)
      res.status(200).json(albums)
    }
    else{
      res.status(404).send("Artists Id not found")
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

// Get a specific album's details based on albumId
app.get('/albums/:albumId', (req, res) => {
  try {
    const albumId = req.params.albumId
    if(albumId) {
      const albums = getAlbumByAlbumId(albumId)
      res.status(200).json(albums)
    }
    else{
      res.status(404).send("Album Id not found")
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

// Add an album to a specific artist based on artistId
app.post('/artist/:artistId/albums', (req, res) => {
  try {
    const artistId = req.params.artistId
    const data = req.body
    if(artistId) {
      const albums = addAlbumByArtistId(artistId, data)
      res.status(201).json(albums)
    }
    else{
      res.status(404).send("Artist Id not found")
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

// Edit a specified album by albumId
app.patch('/albums/:albumId', (req, res) => {
  try {
    const albumId = req.params.albumId
    const data = req.body
    if(albumId && data) {
      const albums = editAlbumByAlbumId(albumId, data)
      res.status(200).json(albums)
    }
    else if(albumId && !data) {
      res.status(404).send("Data not found")
    }
    else if(!albumId && data) {
      res.status(404).send("AlbumId not found")
    }
    else{
      res.status(404).send("AlbumId && Data not found")
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

// Delete a specified album by albumId
app.delete('/albums/:albumId', (req, res) => {
  try {
    const albumId = req.params.albumId
    if(albumId) {
      deleteAlbumByAlbumId(albumId)
      res.status(200).send({
        "message": "Successfully deleted"
      })
    }
    else{
      res.status(404).send("AlbumId not found")
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

// Get all albums with names filtered by first letter
app.get('/albums?startsWith=', (req, res) => {
  try {
    const startsWith = req.query.startsWith
    if (startsWith){
      const albums = getFilteredAlbums(startsWith)
      res.status(200).json(albums)
    }
    else{
      res.status(404).send("Query 'startsWith' is required");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
})

// Get all songs of a specific artist based on artistId
app.get('/artists/:artistId/songs', (req, res) => {
  try {
    const artistId = req.params.artistId
    if(artistId) {
      const songs = getSongsByArtistId(artistId)
      res.status(200).json(songs)
    }
    else{
      res.status(404).send("Parameter 'artistId' is required");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
})

// Get all songs of a specific album based on albumId
app.get('/albums/:albumId/songs', (req, res) => {
  try {
    const albumId = req.params.albumId
    if(albumId) {
      const songs = getSongsByAlbumId(albumId)
      res.status(200).json(songs)
    }
    else{
      res.status(404).send("Parameter 'albumId' is required");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
})

// Get a specific song's details based on songId
app.get('/songs/:songId', (req, res) => {
  try {
    const songId = req.params.songId
    if(songId) {
      const songs = getSongBySongId(songId)
      res.status(200).json(songs)
    }
    else{
      res.status(404).send("Parameter 'songId' is required");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
})

// Add a song to a specific album based on albumId
app.post('/songs/:songId', (req, res) => {
  try {
    const songId = req.params.songId
    const data = req.body
    if(songId) {
      const songs = addSongByAlbumId(songId, data)
      res.status(201).json(songs)
    }
    else if(songId && !data) {
      res.status(404).send("Data not found")
    }
    else if(!songId && data) {
      res.status(404).send("Song Id not found")
    }
    else{
      res.status(404).send("Song Id && Data not found")
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
})

// Edit a specified song by songId
app.patch('/songs/:songId', (req, res) => {
  try {
    const songId = req.params.songId
    const data = req.body
    if(songId) {
      const songs = editSongBySongId(songId, data)
      res.status(200).json(songs)
    }
    else if(songId && !data) {
      res.status(404).send("Data not found")
    }
    else if(!songId && data) {
      res.status(404).send("Song Id not found")
    }
    else{
      res.status(404).send("Song Id && Data not found")
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
})

// Delete a specified song by songId
app.delete('/songs/:songId', (req, res) => {
  try {
    const songId = req.params.songId
    if(songId) {
      deleteSongBySongId(songId, data)
      res.status(200).json({
        "message": "Successfully deleted"
      })
    }
    else{
      res.status(404).send("Song Id not found")
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
