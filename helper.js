import { client } from "./index.js";

//-----------------MongoDB queries for Mentors Collection------------------
export async function getAllMovies(req) {
    return await client.db("b44wd").collection("movies").find().toArray();
}

export async function getMovieById(id) {
    return await client.db("b44wd").collection("movies").findOne({ id: id });
}

export async function addMovie(newMovie) {
return await client.db("b44wd").collection("movies").insertOne(newMovie);
}

export async function updateMovieById(id, updateMovie) {
return await client
    .db("b44wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: updateMovie });
}

export async function getMaxId(){
    return await client.db("b44wd")
    .collection("movies").aggregate([{
        $group: {
            _id: '',
            maxId: {
                $max: "$id"
            }
        }
    }]).toArray();
}

export async function deleteMovieById(id) {
return await client.db("b44wd").collection("movies").deleteOne({ id: id });
}
