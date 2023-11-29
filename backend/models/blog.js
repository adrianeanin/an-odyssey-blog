const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    subTitle: { type: String, required: true },
    body: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    tags: [{ type: String }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        name: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blogs", blogSchema);
