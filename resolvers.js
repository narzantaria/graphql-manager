const User = require('./models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  users: () => {
    return User.find().select('-password')
      .then(users => {
        return users.map(user => {
          return {
            ...user._doc,
            _id: user.id,
            date: new Date(user.date).toISOString()
          };
        });
      })
      .catch(err => {
        throw err;
      });
  },
  findUser: async (args) => {
    try {
      let user = await User.findById(args.id).select('-password');
      return {
        ...user._doc,
        date: new Date(user.date).toISOString()
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    const { name, email, password, token } = args.userInput;
    try {
      const verify = await jwt.verify(token, config.get('jwtSecret'));
      if (!verify) {
        // return new Error('Token is not valid');
        throw err;
      }
      // Check if user exists:
      let user = await User.findOne({ email });
      if (user) {
        return new Error('User already exists');
      }
      // Get users gravatar:
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({
        name,
        email,
        password,
        avatar,
        date: new Date(args.userInput.date)
      });
      // Encrypt password:
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        date: new Date(user.date).toISOString()
      }
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (args) => {
    const { _id, token } = args.userRemove;
    try {
      const verify = await jwt.verify(token, config.get('jwtSecret'));
      if (!verify) return new Error('Token is not valid');
      const user = await User.findById(_id);
      return user.remove().then(result => {
        return { ...result._doc, _id: result._doc._id.toString() };
      });
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (args) => {
    const { _id, name, email, password, token } = args.userUpdate;
    try {
      const verify = await jwt.verify(token, config.get('jwtSecret'));
      if (!verify) return new Error('Token is not valid');
      // Get users gravatar:
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const user = await User.findById(_id);
      user.name = name;
      user.email = email;
      // Encrypt password:
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.avatar = avatar;
      await user.save();
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  authUser: async (args) => {
    const { email, password } = args.userAuth;
    try {
      // Check if user exists:
      let user = await User.findOne({ email });
      if (!user) {
        return new Error('Invalid Credentials');
      }
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return new Error('Invalid Credentials');
      }
      // JWT Token:
      const payload = {
        user: {
          id: user._id
        }
      };
      let token = await jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },   // Expiration (optional)
      );
      return {
        token: token
      }
    } catch (err) {
      throw err;
    }
  }
};