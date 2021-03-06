const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must include a name']
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student'
  },
  email: {
    type: String,
    required: [true, 'Must include an email'],
    validate: {
      validator: (v) => {
        /^[a-z0-9](\.?[a-z0-9]){3,}@west-mec\.(edu|org)$/gi.test(v);
      },
      error: 'Invalid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Must include a password'],
    minLength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: (v) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(v)
      },
      error: 'Password not strong enough'
    },
    select: false
  },
  class: {
    campus: {
      type: String,
      enum: ['northeast', 'northwest', 'southwest'],
      required: [true, "Must include your campus"]
    },
    session: {
      type: Number,
      enum: [1, 2],
      //? wouldn't be required because of teachers. they teach both sessions
    },
    year: {
      type: Number,
      enum: [1, 2],
    }
  },
  profilePicURL: {
    type: String
  }
})


module.exports = mongoose.models.User || mongoose.model('User', UserSchema);