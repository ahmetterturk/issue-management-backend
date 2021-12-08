const getIssues = (req, res) => {
    try {
        res.status(200).json('All issues')
    } catch (error) {
        res.status(500).json(error)
    }
}

const createIssue = (req, res) => {
    try {
        res.status(200).json('create issue')
    } catch (error) {
        res.status(500).json(error)
    }
}

const getIssue = (req, res) => {
    try {
        res.status(200).json(`get single issue ${req.params.id}`)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateIssue = (req, res) => {
    try {
        res.status(200).json(`update issue ${req.params.id}`)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteIssue = (req, res) => {
    try {
        res.status(200).json(`delete issue ${req.params.id}`)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getIssues, getIssue, createIssue, updateIssue, deleteIssue
}