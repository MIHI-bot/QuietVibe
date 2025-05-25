import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },
    createdAt: {
        type: Date,
        default: Date.now
        //will tell the date of the comment
    },
    parentId: {
        type: String
        // will be needed to tell whetheer the comment has been replied to some other comment

    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
    likeCount: { type: Number }

 
});
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);
export default Thread;
// This is multi level commenting with replies functionality, which was so nadly required while  making that challeng frim frontendmentor.io and th challenge wqas Ineractive comment section

