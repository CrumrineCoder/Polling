const mongoose = require('mongoose');

const { Schema } = mongoose;

const PollSchema = new Schema({
  question: String,
  user: String,
  options: {
    MultipleAnswers: Boolean,
    UserAnswers: Boolean, 
    Rescind: Boolean, 
    SeeResults: Boolean, 
    Captcha: Boolean
  },
  answers: [{text: String, value: Number}], 
  userAnswers: [{text: String, value: Number}]
}, { timestamps: true, minimize: false });

PollSchema.index({"question": 1});

PollSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    question: this.question,
    options: this.options,
    answers: this.answers,
    userAnswers: this.userAnswers,
    votes: this.votes,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Polls', PollSchema);