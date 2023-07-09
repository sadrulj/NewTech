import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Products",
            },
        ],
        buyer: {
            type: mongoose.ObjectId,
            ref: "users",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);