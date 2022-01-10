// Get the Issue model from models folder
const Issue = require('../models/issuesModel');

// Get all issues
const getIssues = async (req, res) => {
  const status = req.query.status;
  try {
    let allIssues;
    if (status) {
      allIssues = await Issue.find({ status: status });
    } else {
      allIssues = await Issue.find();
    }

    res.status(200).json(allIssues);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a new issue
const createIssue = async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    const result = await newIssue.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get single issue by id
const getIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const singleIssue = await Issue.findById(id);

    // if no issue found with the id, return this
    if (!singleIssue) {
      return res.status(404).json(`No issue with id ${id}`);
    }

    res.status(200).json(singleIssue);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update issue found by id
const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const foundIssue = req.body;
    const updatedIssue = await Issue.findByIdAndUpdate(id, foundIssue);

    // if no issue found with the id, return this
    if (!updatedIssue) {
      return res.status(404).json(`No issue with id ${id}`);
    }

    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete issue found by id
const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIssue = await Issue.findByIdAndDelete(id);

    // if no issue found with the id, return this
    if (!deletedIssue) {
      return res.status(404).json(`No issue with id ${id}`);
    }

    res.status(200).json(`Issue has been deleted!`);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
};
