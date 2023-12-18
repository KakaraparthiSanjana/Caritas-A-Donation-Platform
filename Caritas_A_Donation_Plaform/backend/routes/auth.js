const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const Organization = require('../models/Organization');
const Donor = require('../models/Donor');

const JWT_SECRET = 'itsA$Secrete';




//create Donor
router.post('/createDonor', [
  // Validation middlewares
  body('name', 'Enter a valid name'),
  body('phoneNo', 'Enter a valid phoneno'),
  body('Address', 'please Address').exists(),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  console.log("Test");
  console.log(req);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let user = await Donor.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success: false, error: "Sorry, a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await Donor.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      Address: req.body.Address
    });

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, authtoken });

  } catch (error) {
    console.log(error);
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//crate organization

router.post('/createOrganization', [
  body('name', 'Enter a valid name').exists(),
  body('type', 'enter a valid type').exists(),
  body('registrationnumber', 'enter a valid registrationnumber numbr').exists(),
  body('phoneNo', 'Enter a valid phoneno').exists(),
  body('Address', 'please Address').exists(),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  body('ManagerName','enter manager or incharge name').exists(),


],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await Organization.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10); //unique value for pw is salt 
      const secPass = await bcrypt.hash(req.body.password, salt); //

      // Create a new Organization
      user = await Organization.create({
        name: req.body.name,
        type: req.body.type,
        registrationnumber: req.body.registrationnumber,
        password: secPass,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        Address: req.body.Address,
        requirements: req.body.requirements,
        ManagerName:req.body.ManagerName,
        About:req.body.About
      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      success = true;
      res.json({ success, authtoken })

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })


// //login donor

// router.post('/loginDonor', [
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'Password cannot be blank').exists(),
// ], async (req, res) => {
//     let success = false;
//     // If there are errors, return Bad request and the errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     try {
//         let user = await Donor.findOne({ email });
//         if (!user) {
//             success = false
//             return res.status(400).json({ error: "Please try to login with correct credentials" });
//         }

//         const passwordCompare = await bcrypt.compare(password, user.password);
//         if (!passwordCompare) {
//             success = false
//             return res.status(400).json({ success, error: "Please try to login with correct credentials" });
//         }

//         const data = {
//             user: {
//                 id: user.id
//             }
//         }
//         const authtoken = jwt.sign(data, JWT_SECRET);
//         success = true;
//         res.json({ success, authtoken })

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }


// });


// //login organization

// router.post('/loginOrganization', [
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'Password cannot be blank').exists(),
// ], async (req, res) => {
//     let success = false;
//     // If there are errors, return Bad request and the errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     try {
//         let user = await Organization.findOne({ email });
//         if (!user) {
//             success = false
//             return res.status(400).json({ error: "Please try to login with correct credentials" });
//         }

//         const passwordCompare = await bcrypt.compare(password, user.password);
//         if (!passwordCompare) {
//             success = false
//             return res.status(400).json({ success, error: "Please try to login with correct credentials" });
//         }

//         const data = {
//             user: {
//                 id: user.id
//             }
//         }
//         const authtoken = jwt.sign(data, JWT_SECRET);
//         success = true;
//         res.json({ success, authtoken })
//         console.log(user);

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }


// });



// login donor

router.post('/Donorlogin', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await Donor.findOne({ email });
    console.log(user);
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
        name:user.name,
        phoneNo:user.phoneNo,

      }
    }
    
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken,data })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});

// organization login

router.post('/organizationlogin', [
  body('registrationnumber', 'Enter a valid registrationnumber').exists(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { registrationnumber, password } = req.body;
  try {
    let user = await Organization.findOne({ registrationnumber });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
        name:user.name,
        type:user.type,
        registrationnumber:user.registrationnumber,
        phoneNo:user.phoneNo,
        Address:user.Address,
        requirements:user.requirements,
        email:user.email,
        password:user.password,
        ManagerName:user.ManagerName,
        About:user.About
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken, data })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});


router.get('/api', (req, res) => {
  console.log('hi')
  res.send('i am connected');
})


router.get('/data', async (req, res) => {
  try {
    const data = await Organization.find(); // Fetch all data from MongoDB
    res.json(data);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});










// Update organization details
router.post('/updateOrganization', async (req, res) => {
  const { registrationnumber, updatedData } = req.body;

  try {
    const organization = await Organization.findOne({ registrationnumber });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Update organization fields with new data
    Object.keys(updatedData).forEach((key) => {
      organization[key] = updatedData[key];
    });

    // Save the updated organization
    await organization.save();

    res.json({ message: 'Organization details updated successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get organization details by registration number
router.get('/getOrganization/:registrationnumber', async (req, res) => {
  const registrationnumber = req.params.registrationnumber;
  

  try {
    const organization = await Organization.findOne({ registrationnumber });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;