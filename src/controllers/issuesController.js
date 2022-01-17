// Get the Issue model from models folder
const Issue = require('../models/issuesModel');

// Get all issues
const getIssues = async (req, res) => {
  // declaring status var and assigning request query of status to create a query string for fetching issues regarding status query
  const status = req.query.status;
  // declaring userId var and assigning request query of userId to create a query string for fetching issues regarding userId query
  const userId = req.query.userId;
  try {
    // define allIssues variable
    let allIssues;
    // if there is query of status
    if (status) {
      // assign the issues where it finds issues by their status
      allIssues = await Issue.find({ status: status });
      // if there is query of userId
    } else if (userId) {
      // assign the issues where it finds isseus by their userId
      allIssues = await Issue.find({ userId: userId });
      // if there is no query
    } else {
      // find all issues
      allIssues = await Issue.find();
    }
    // response with 200 status and return allIssues in json format
    res.status(200).json(allIssues);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a new issue
const createIssue = async (req, res) => {
  try {
    // create a new Issue with request body
    const newIssue = new Issue(req.body);
    // declare the result var and save the created issue to it
    const result = await newIssue.save();
    // response with 200 ok and return result in json format
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get single issue by id
const getIssue = async (req, res) => {
  try {
    // destructure the id from request params
    const { id } = req.params;
    // find the issue by its id and assign it to the single issue var
    const singleIssue = await Issue.findById(id);

    // if no issue found with the id, return 404 status for not found
    if (!singleIssue) {
      return res.status(404).json(`No issue with id ${id}`);
    }
    // if there is issues, return 200 ok with the singleIssue object
    res.status(200).json(singleIssue);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update issue found by id
const updateIssue = async (req, res) => {
  try {
    // destructure the id from request params
    const { id } = req.params;
    // assign request body to found issue
    const foundIssue = req.body;
    // update the issues with findByIdAndUpdate method and pass the id and fondIssue as arguments
    const updatedIssue = await Issue.findByIdAndUpdate(id, foundIssue);

    // if no issue found with the id, return 404 status for not found
    if (!updatedIssue) {
      return res.status(404).json(`No issue with id ${id}`);
    }
    // if there is, response with 200 ok and updatedIsseu in json format
    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete issue found by id
const deleteIssue = async (req, res) => {
  try {
    // destructure the id from request params
    const { id } = req.params;
    // find issues by id and usee findByIdAndDelete method by passign the id to deletedIssue var
    const deletedIssue = await Issue.findByIdAndDelete(id);

    // if no issue found with the id, return 404 status with not found msg
    if (!deletedIssue) {
      return res.status(404).json(`No issue with id ${id}`);
    }
    // if there is return 200 ok and msg of issue has been deleted
    res.status(200).json(`Issue has been deleted!`);
  } catch (error) {
    res.status(500).json(error);
  }
};
// export all controllers
module.exports = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
};
