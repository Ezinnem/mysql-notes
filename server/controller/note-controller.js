const mysqlConnection = require('../dbconnection');

//Create a note
exports.createNote = async (req, res) => {
    try {
        const { description } = req.body;
        const sql = 'INSERT INTO note (description) VALUES (?)';
        const results = await mysqlConnection.query(sql, description);
        res.status(200).json({ message: 'Note created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Notes
exports.getAllNotes = async (req, res) => {
    try {
        const sql = "SELECT * FROM note";
        await mysqlConnection.query(sql, (error, results, fields) => {
            res.status(200).json({ results });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Get One note
exports.getOneNote = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM note WHERE note_id = ?";

        await mysqlConnection.query(sql, id, (error, rows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Note not found' });
            }

            res.status(200).json({ note: rows[0] });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Update a Note
exports.updateOneNote = (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const sqlCheckExistence = "SELECT * FROM note WHERE note_id = ?";
        const sqlUpdate = "UPDATE note SET description = ? WHERE note_id = ?";

        // Check if the note exists
        mysqlConnection.query(sqlCheckExistence, id, (error, existingRows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'Note not found' });
            }

            // Update the note
            mysqlConnection.query(sqlUpdate, [description, id], (updateError, updateResults) => {
                if (updateError) {
                    console.error(updateError.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                res.status(200).json({ message: 'Note has been updated', updateResults });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete a note
exports.deleteOneNote = (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = "SELECT * FROM note WHERE note_id = ?";
        const sqlDelete = "DELETE FROM note WHERE note_id = ?";

        // Check if the note exists
        mysqlConnection.query(sqlCheckExistence, id, (error, existingRows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'Note not found' });
            }

            // Delete the note
            mysqlConnection.query(sqlDelete, [id], (deleteError, deleteResults) => {
                if (deleteError) {
                    console.error(deleteError.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                res.status(200).json({ message: 'Note has been deleted' });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};