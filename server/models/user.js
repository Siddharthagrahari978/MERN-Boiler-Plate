const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: { type: String, maxlength: 24 },
  lastname: { type: String, maxlength: 24 },
  email: { type: String, trim: true, unique: 1, required: true },
  password: { type: String, minlength: 6, required: true },
  role: { type: Number, default: 0 },
  token: { type: String },
  tokenExp: { type: Number },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    //? Hashing Method 1
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });

    //? Hashing Method 2
    /*
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
    */
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callBack) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callBack) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secret");

  user.token = token;
  user.save(function (err, user) {
    if (err) return callBack(err);
    callBack(null, user);
  });
};

userSchema.statics.findByToken = function (token, callBack) {
  var user = this;

  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return callBack(err);
      callBack(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
