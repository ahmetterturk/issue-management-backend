const Issue = require('../models/issuesModel')




const getIssues = async (req, res) => {
  try {
 
    const allIssues = await Issue.find({})
    

    res.status(200).json(allIssues);
  } catch (error) {
    res.status(500).json(error);
  }
};



const createIssue = async (req, res) => {
  try {

    const newIssue = new Issue(req.body)
    const result = await newIssue.save()

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getIssue = (req, res) => {
  try {
    res.status(200).json(`get single issue ${req.params.id}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateIssue = (req, res) => {
  try {
    res.status(200).json(`update issue ${req.params.id}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteIssue = (req, res) => {
  try {
    res.status(200).json(`delete issue ${req.params.id}`);
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
