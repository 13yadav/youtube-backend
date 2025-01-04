import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  //TODO: create post
});

const getUserPosts = asyncHandler(async (req, res) => {
  // TODO: get user posts
});

const updatePost = asyncHandler(async (req, res) => {
  //TODO: update post
});

const deletePost = asyncHandler(async (req, res) => {
  //TODO: delete post
});

export { createPost, getUserPosts, updatePost, deletePost };
