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

// Your code here
app.use(express.json())

app.use((req, res, next) => {
  // console.log('Body:', req.body);
  next();
});

// REQ.PARAMS INCLUDES THE ENDPOINT
// REQ.BODY INCLUDES THE DATA THAT THE USER PASSED

app.get("/artists", (req, res) => { //
  try{
    const allArtist = getAllArtists();
    res.status(200).json(allArtist);
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.post("/artists", (req, res) => { //
  try{
    const newArtist = addArtist(req.body);
    // {
    //   "name": "Red Hot Chili Peppers"
    // }
    res.status(201).json(newArtist);
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.get("/artists/latest", (req, res) => { //
  try{
    const latestArtist = getLatestArtist();
    res.status(200).json(latestArtist);
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.get("/artists/:artistId", (req, res) => { //
  try{
    const individualArtist = getArtistByArtistId(req.params.artistId);
    res.status(200).json(individualArtist);
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.patch("/artists/:artistId", (req, res) => { //
  try{
    const editedArtist = editArtistByArtistId(req.params.artistId, req.body);
    // {
    //   "name": "Red Hot Chili Peppers"
    // }
    res.status(200).json(editedArtist);
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.put("/artists/:artistId", (req, res) => { //
  try{
    const editedArtist = editArtistByArtistId(req.params.artistId, req.body);
    // {
    //   "name": "Red Hot Chili Peppers"
    // }
    res.status(200).json(editedArtist);
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.delete("/artists/:id", (req, res) => { //
  try{
    const deletedArtist = deleteArtistByArtistId(req.params.id)
    const response = {
      "message": "Successfully deleted"
    }
    res.status(200).json(response)
  }
  catch(error){
    res.status(404).json(error)
  }
})


app.get("/artists/latest/albums", (req, res) => { //
  try{
    const latestAlbum = getAlbumsForLatestArtist()
    res.status(200).json(latestAlbum)
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.get("/artists/:id/albums", (req, res) => { //
  try{
    const artistsAlbum = getAlbumsByArtistId(req.params.id)
    res.status(200).json(artistsAlbum)
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.get("/albums/:id", (req, res) => { //
  try{
    const albumById = getAlbumByAlbumId(req.params.id)
    res.status(200).json(albumById)
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.post('/artists/:id/albums', (req, res) => {
  try{
    const newAlbum = addAlbumByArtistId(req.params.id, req.body)
    // {
    //   "name": "Stadium Arcadium",
    // }
    res.status(201).json(newAlbum)
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.patch('/albums/:id', (req, res) => {
  try{
    const editedAlbum = editAlbumByAlbumId(req.params.id, req.body)
    // {
    //   "name": "Stadium Arcadium",
    // }
    res.status(200).json(editedAlbum)
  }
  catch(error){
    res.status(404).json(error)
  }
})
app.put('/albums/:id', (req, res) => {
  try{
    const editedAlbum = editAlbumByAlbumId(req.params.id, req.body)
    // {
    //   "name": "Stadium Arcadium",
    // }
    res.status(200).json(editedAlbum)
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.delete('/albums/:id', (req, res) => {
  try{
    const deleteAlbum = deleteAlbumByAlbumId(req.params.id)
    const response = {
      "message": "Successfully deleted"
    }
    res.status(200).json(response)
  }
  catch(error){
    res.status(404).json(error)
  }
})

// REMEMBER THAT ANY FUNCTIONS THAT REQUIRE A PARAMETER IS A 'POST'
app.get('/albums', (req, res) => { //

  try{
    const filteredAlbums = getFilteredAlbums(req.query.startsWith)
    // {
    //   "search": "s"
    // }
    res.status(200).json(filteredAlbums)
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.get('/artists/:id/songs', (req, res) => { //
  try{
    const songsByArtist = getSongsByArtistId(req.params.id)
    res.status(200).json(songsByArtist)
  }
  catch(error){
    res.status(404).json(error)
  }
})

app.get('/albums/:id/songs', (req, res) => { //
  try {
    const songsByAlbums = getSongsByAlbumId(req.params.id)
    res.status(200).json(songsByAlbums)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.get('/songs/:id', (req, res) => { //
  try {
    const song = getSongBySongId(req.params.id)
    res.status(200).json(song)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.post('/albums/:id/songs', (req, res) => { //
  try {
    const addedSong = addSongByAlbumId(req.params.id, req.body)
    // {
    //   "name": "California",
    //   "trackNumber": 1,
    //   "lyrics": "Yeah, yeah, yeah"
    // }
    res.status(201).json(addedSong)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.patch('/songs/:id', (req, res) => { //
  try {
    const editedSong = editSongBySongId(req.params.id, req.body)
    res.status(200).json(editedSong)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.put('/songs/:id', (req, res) => { //
  try {
    const editedSong = editSongBySongId(req.params.id, req.body)
    res.status(200).json(editedSong)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.delete('/songs/:id', (req, res) => { //
  try {
    const deletedSong = deleteSongBySongId(req.params.id)
    const response = {
      "message": "Successfully deleted"
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json(error)
  }
})




// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
