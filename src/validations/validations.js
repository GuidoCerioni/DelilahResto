/* ALL DATA VALIDATIONS*/

const { checkSchema } = require("express-validator");

//USER VALIda
module.exports = {
  newUser: checkSchema({
    full_name: {
      in: "body",
      optional: false,
      isLength: {
        errorMessage: "Full name 3-30 characters",
        options: {
          min: 3,
          max: 30,
        },
      },
    },
    username: {
      in: "body",
      optional: false,
      isLength: {
        errorMessage: "username should have between 3 and 64 characters",
        options: {
          min: 3,
          max: 64,
        },
      },
      custom: {
        options: async (username) => {
          const validInfo = await User.findOne({ where: { username } });
          if (validInfo !== null)
            return Promise.reject(
              `Username ${username} has been already taken.`
            );
        },
      },
    },
    email: {
      in: "body",
      optional: false,
      isEmail: true,
      custom: {
        options: async (email) => {
          const validInfo = await User.findOne({ where: { email } });
          if (validInfo !== null)
            return Promise.reject(
              `Email ${email} has been already registered.`
            );
        },
      },
    },
    phone: {
      in: "body",
      optional: false,
      isNumeric: true,
    },
    address: {
      in: "body",
      optional: false,
      isLength: {
        errorMessage: "Address should have between 1 and 128 characters",
        options: {
          min: 1,
          max: 128,
        },
      },
    },
    password: {
      in: "body",
      optional: false,
      isLength: {
        errorMessage: "Password should at least have 8 elements.",
        options: {
          min: 8,
        },
      },
    },
  }),
};

/* xports.newUser = [
  body("password")
    .exists()
    .isAlphanumeric()
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "password should not be empty, should be more than 3 and less than 30 character"
    )
    .trim(),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation.array(),
      });
    } else {
      next();
    }
  },

  check("userName")
    .exists()
    .isAlphanumeric()
    .withMessage("userName should be alpanumeric")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "userName should not be empty, should be more than 3 and less than 30 character"
    )
    .trim(),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation.array(),
      });
    } else {
      next();
    }
  },

  check("fullName")
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 5 })
    .withMessage("Must be at least 10 chars long"),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation,
      });
    } else {
      next();
    }
  },
  check("email")
    .exists()
    .isAlphanumeric()
    .withMessage("userName should be alpanumeric")
    .normalizeEmail()
    .isEmail(),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation,
      });
    } else {
      next();
    }
  },
  check("phoneNumber")
    .exists()

    .isMobilePhone()
    .trim(),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation,
      });
    } else {
      next();
    }
  },
  check("address")
    .exists()
    .isAlphanumeric()
    .withMessage("userName should be alpanumeric")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "userName should not be empty, should be more than 3 and less than 30 character"
    )
    .isLength({ min: 3, max: 30 })
    .trim(),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation,
      });
    } else {
      next();
    }
  },
];
 */
