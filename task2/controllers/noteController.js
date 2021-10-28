const Note = require('../models/Note');
const User = require('../models/User');
const bcrypt = require("bcryptjs");

class noteController {
  async addNoteForUser(req, res) {
    try {
      const text = req.body.text;
      const note = new Note({
        userId: req.user.id,
        text: text
      })

      await note.save();
      return res.status(200).json({message: 'Success'});
    } catch (e) {
      res.status(500).json({message: 'Internal server error'});
    }
  }

  async getUsersNotes(req, res) {
    try {
      let offset = 0;
      let limit = 5;

      if(req.query.offset) offset = req.query.offset;
      if(req.query.limit) limit = req.query.limit;

      const usersNotesToShow = await Note.find({
        userId: req.user.id
      }).slice(offset, offset + limit);

      // const notesToShow = usersNotes.slice(offset, offset + limit)
      // console.log(usersNotes)

      return res.status(200).json({
        offset: offset,
        limit: limit,
        count: usersNotesToShow.length,
        notes: usersNotesToShow
      });
    } catch (e) {
      res.status(500).json({message: 'Internal server error'});
    }
  }

  async getUsersNoteById(req, res) {
    try {
      const {noteId} = req.params;
      if(!noteId) {
        res.status(400).json({message: 'Bad request'});
      }

      const note = await Note.findById(noteId);
      if(!note) {
        res.status(400).json({message: 'Bad request'});
      }

      res.status(200).send({note: note});
    } catch (e) {
      res.status(500).json({message: 'Internal server error'});
    }
  }

  async updateUsersNote(req, res) {
    try {
      const {text} = req.body;
      if(!text) {
        res.status(400).json({message: 'Bad request'});
      }

      const {noteId} = req.params;
      if(!noteId) {
        res.status(400).json({message: 'Bad request'});
      }

      const note = await Note.findById(noteId);
      if(!note) {
        res.status(400).json({message: 'Bad request'});
      }

      await Note.updateOne({id: noteId}, {text: text})

      res.status(200).send({message: 'Success'});
    } catch (e) {
      res.status(500).json({message: 'Internal server error'});
    }
  }

  async checkUsersNote(req, res) {
    try {
      const {noteId} = req.params;
      if(!noteId) {
        res.status(400).json({message: 'Bad request'});
      }

      const note = await Note.findById(noteId);
      if(!note) {
        res.status(400).json({message: 'Bad request'});
      }

      let checked = !note.completed;

      await Note.updateOne({id: noteId}, {completed: checked})

      res.status(200).send({message: 'Success'});
    } catch (e) {
      res.status(500).json({message: 'Internal server error'});
    }
  }

  async deleteUsersNote(req, res) {
    try {
      const {noteId} = req.params;
      if(!noteId) {
        res.status(400).json({message: 'Bad request'});
      }

      const note = await Note.findById(noteId);
      if(!note) {
        res.status(400).json({message: 'Bad request'});
      }

      await Note.deleteOne(note)

      res.status(200).send({message: 'Success'});
    } catch (e) {
      res.status(500).json({message: 'Internal server error'});
    }
  }
}

module.exports = new noteController();

