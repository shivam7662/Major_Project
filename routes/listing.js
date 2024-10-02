const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const uplode = multer({storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, uplode.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));



// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, uplode.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


// Edit Route (Ensure id is valid)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



// // Index route for listings
// router.get("/", wrapAsync(listingController.index));
  
// // New Route
// router.get("/new", isLoggedIn, listingController.renderNewForm);
  
// // Show Route (Ensure id is valid)
// router.get("/:id", wrapAsync(listingController.showListing));

// // Create Route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));
  
// // Edit Route (Ensure id is valid)
// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
  
// // Update Route (Ensure id is valid)
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));
  
// // Delete Route (Ensure id is valid)
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;