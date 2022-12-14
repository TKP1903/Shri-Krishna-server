const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { qualifications } = require('../config/qualifications');

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate(name) {
        return name != null && name.length > 0;
      },
      trim: true,
      lowerCase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    // hashed
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
    },
    // hashed_password: {
    //   type: String,
    //   required: true,
    // },
    // salt: {
    //   type: String,
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: {
        number: {
          type: Number,
          validate: [
            (phone) => {
              return !!phone && phone.length === 10;
            },
            'Phone number should be 10 digits',
          ],
          unique: true,
        },
        dailCode: {
          type: String,
          default: '+91',
        },
      },
    },
    qualification: {
      type: String,
      enum: qualifications,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
      validate: [
        (address) => {
          return !!address && address != null && address.length >= 10;
        },
        'Address should be at least 10 characters long',
      ],
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    country: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    city: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    state: {
      type: String,
      trim: true,
      lowerCase: true,
    },
    userIPs: {
      type: Array,
      default: [],
    },
    userBrowsers: {
      type: Array,
      default: [],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    rights: {
      userPanel: Boolean,
      adminPanel: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
