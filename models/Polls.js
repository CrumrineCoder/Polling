const mongoose = require('mongoose');

const { Schema } = mongoose;

// Mongoose Schema for polls. Names are self-explanatory generally, but we're storing the question of the poll, the numbers of total votes, the options turned on and off by the poll creator, the answers in a poll, the user answers in a poll, and the poll creator (optional typically)
const PollSchema = new Schema({
  question: String,
  value: Number, 
  options: {
    MultipleAnswers: Boolean,
    UserAnswers: Boolean, 
    Rescind: Boolean, 
    SeeResults: Boolean, 
    Captcha: Boolean
  },
  answers: [{text: String, value: Number, Users: [String]}], 
  userAnswers: [{text: String, value: Number, Users: [String]}],
  creator: String
}, { timestamps: true, minimize: false });

// For searching purposes
PollSchema.index({"question": 1});

// Outputting the schema
PollSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    question: this.question,
    options: this.options,
    answers: this.answers,
    userAnswers: this.userAnswers,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    creator: this.creator, 
    value: this.value
  };

  
};

mongoose.model('Polls', PollSchema);