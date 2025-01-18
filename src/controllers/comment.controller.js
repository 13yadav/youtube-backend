import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const comments = await Comment.aggregatePaginate(
    [
      {
        $match: {
          video: mongoose.Types.ObjectId.createFromHexString(videoId),
        },
      },
    ],
    {
      page: page,
      limit: limit,
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, comments, "Video comments fetched successfully")
    );
});

const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  if (!comment?.trim()) {
    throw new ApiError(400, "Comment is required");
  }

  const video = await Video.findById(req.params.videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const newComment = await Comment.create({
    content: comment,
    video: video._id,
    owner: req.user._id,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        comment: newComment,
      },
      "Comment added successfully"
    )
  );
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  if (!comment.trim()) {
    throw new ApiError(400, "Comment is required");
  }

  const updatedComment = await Comment.findByIdAndUpdate(commentId, {
    content: comment,
  });

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        comment: updatedComment,
      },
      "Comment updated successfully"
    )
  );
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid commentId");
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
