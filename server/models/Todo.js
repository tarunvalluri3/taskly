const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },

    dueAt: { type: Date, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },

    status: {
      type: String,
      enum: ["current", "completed", "incomplete", "deleted"],
      default: "current"
    },

    failureReason: { type: String, default: "" },
    deleteReason: { type: String, default: "" },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
