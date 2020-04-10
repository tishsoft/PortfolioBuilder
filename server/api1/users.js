import User from '../models/User';

export const getUsers = ({ findCriteria, cbSuccess }) => {
  return User.find(findCriteria).sort({ lastLoggedIn: -1 }).exec(
    (err, users) => {
      const usersOut = [];

      users.forEach((user) => {
        const userInfo = {
          _id: user._id,
          createdAt: user.createdAt,
          lastLoggedIn: user.lastLoggedIn,
          username: user.username,
          displayName: user.displayName,
          email: user.email,
          picture: user.picture,
          bio: user.bio,
          hireable: user.hireable,
          website: user.website,
          interests: user.interests,
          communities: user.communities,
          projects: user.projects,
          followers: user.followers,
          following: user.following
        };
        usersOut.push(userInfo);
      });
      return cbSuccess(usersOut);
    }
  );
};

// Determine if username exists
export const uniqueFieldsExists = ({
  usernameNew, emailNew, usernameOld, emailOld, cbSuccess, cbErr
}) => {
  if (usernameNew !== usernameOld && emailNew === emailOld) {
    // If changing username only...
    return User.findOne({ username: usernameNew }, (err, user) => {
      if (err) {
        return cbErr(err);
      }
      if (user) {
        return cbSuccess({ usernameExists: true, emailExists: false });
      }
      return cbSuccess({ usernameExists: false, emailExists: false });
    });
  } else if (usernameNew === usernameOld && emailNew !== emailOld) {
    // If changing email only...
    return User.findOne({ email: emailNew }, (err, user) => {
      if (err) {
        return cbErr(err);
      }
      if (user) {
        return cbSuccess({ usernameExists: false, emailExists: true });
      }
      return cbSuccess({ usernameExists: false, emailExists: false });
    });
  }

  // If changing both username and email...
  return User.findOne({ username: usernameNew, email: emailNew }, (err, user) => {
    if (err) {
      return cbErr(err);
    }
    if (user) {
      return cbSuccess({ usernameExists: true, emailExists: true });
    }
    return cbSuccess({ usernameExists: false, emailExists: false });
  });
};

// Update user based on id
// TODO: This is dangerous. This API lets anyone update user information
// based on user id. How do we make sure the request is coming from the
// actual user?
// TODO: Make the id come from req.query._id, as consistent from the previous
// api.post request handler
// for user community
export const updatedUserProps = (formFields, user) => {
  return {
    username: formFields.username || user.username,
    displayName: formFields.displayName || user.displayName,
    email: formFields.email || user.email,
    location: formFields.location || user.location,
    interests: formFields.interests || user.interests,
    bio: formFields.bio || user.bio,
    website: formFields.website || user.website
  };
};
