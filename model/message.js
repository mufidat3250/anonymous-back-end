const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  { text: { type: String, required: true, unique: true } },
  { timestamps: { createdAt: "created_at", updatedAt: "updatedAt" } }
);

messageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Message", messageSchema);
