import express from "express";
import {
   getAllMovies,
  getMovieById,
  deleteMovieById,
  addMovie,
  updateMovieById,
  getMaxId,
} from "../helper.js";
const router = express.Router();

//get all movies

router.get("/", async (req, res) => {
  const movie = await getAllMovies();
  res.send(movie);
});

//get movies by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await getMovieById(id);
  movie ? res.send(movie) : res.status(404).send({ message: "No Movie Data Available" });
});


//Add New Movie data

router.post("/", async (req, res) => {
  const newMovie = req.body;
  console.log(req.body);
  const [{maxId}] = await getMaxId();
  const newId =  Number(maxId)+1;
    newMovie.id = newId.toString();
   const result = await addMovie(newMovie);
   if(result.acknowledged){
    res.send({message:"New Movie Inserted Successfully"});
   }
   else{
    res.send({message:"Something Went Wrong"});
   }
   
});

//delete Movie by id

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteMovieById(id);
  res.send(result);
});

// update the Movie Data

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateMovie = req.body;
  const result = await updateMovieById(id, updateMovie);
  res.send(result);
});

export const moviesRouter = router;
