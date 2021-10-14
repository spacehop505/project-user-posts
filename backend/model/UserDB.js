const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, minLength: 4, maxLength: 25, lowercase: true },
  password: { type: String, required: true, minLength: 6, maxLength: 255, select: false },
  username: { type: String, required: true, unique: true, minLength: 3, maxLength: 25 },
  posts: [{ type: Schema.Types.ObjectId, ref: 'UserPost' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }
  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// this is a UserSchema Method
UserSchema.methods = {
  comparePassword: function (candidatePassword, done) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      done(null, isMatch);
    });
  }
};

module.exports = model('User', UserSchema);
