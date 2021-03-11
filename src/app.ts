import express from "express";
//import dotenv from "dotenv";
import path from "path";
//dotenv.config()
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
// Something has to go in here

import FriendsFacade from "./facades/DummyDB-Facade";

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/demo", (req, res) => {
  res.send("Server is up");
});

app.post("/add", async (request, response) => {
  try {
    const facade = new FriendsFacade();
    const promise = await facade.addFriend(request.body);

    response.json(promise);
  } catch (error) {
    response.json({ message: error.message });
  }
});

app.delete("/delete", async (request, response) => {
  try {
    const facade = new FriendsFacade();
    const promise = await facade.deleteFriend(request.body.email);

    console.log(facade.friends);
    response.json(promise);
  } catch (error) {
    response.json({ message: error.message });
  }
});

app.get("/all", async (request, response) => {
  try {
    const facade = new FriendsFacade();
    const promise = await facade.getAllFriends();

    response.json(promise);
  } catch (error) {
    response.json({ message: error.message });
  }
});

app.get("/get", async (request, response) => {
  try {
    const facade = new FriendsFacade();
    const promise = await facade.getFriend(request.body.email);

    response.json(promise);
  } catch (error) {
    response.json({ message: error.message });
  }
});

export default app;
