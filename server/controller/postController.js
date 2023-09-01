import postModelSchema from "../model/postModel.js";
import asyncHandler from "express-async-handler";

export const createPost = asyncHandler(async (req, res) => {
  const { title, body, pic} = req.body;
        const savePost = await postModelSchema.create({
            title,
            body,
            photo:pic,
            postedBy: req.user
        })
  res.status(200).json({ Message: "Post created successfully!" });
});

export const allPost = asyncHandler(async (req, res) => {
  const findAllPost = await postModelSchema
    .find()
    .populate("postedBy", "_id username photo")
    .populate("comments.postedBy", "_id username");
  res.status(200).json(findAllPost);
});

export const myPost = asyncHandler(async (req, res) => {
  const findMyPost = await postModelSchema
    .find({ postedBy: req.user._id })
    .populate("postedBy", "_id username");
  res.status(200).json(findMyPost);
});

export const likePost = asyncHandler(async (req, res) => {
  const likePostData = await postModelSchema.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).populate("postedBy", "_id username")
  res.json(likePostData);
});

export const unLikePost = asyncHandler(async (req, res) => {
  const likePostData = await postModelSchema.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).populate("postedBy", "_id username")
  res.json(likePostData);
});

export const commentPost = asyncHandler(async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  const commentPostData = await postModelSchema
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
    .populate("comments.postedBy", "_id username")
    .populate("postedBy", "_id username");
  res.json(commentPostData);
});

export const deletePost = asyncHandler(async (req, res) => {
      await postModelSchema.findByIdAndDelete({_id:req.params.id}).populate("postedBy", "_id")
      res.status(200).json({message: "Post Deleted!"})
})
