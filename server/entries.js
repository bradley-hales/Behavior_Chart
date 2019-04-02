const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

//
// Entries
//

const entrySchema = new mongoose.Schema({
  date: String,
  day: String,
  wakeUp: String,
  doseTime: String,
  amount: Number,
  bedTime: String,
  cottonBalls: Number,
  note: String,
  tantrums: Number
});

const Entry = mongoose.model('Entry', entrySchema);

router.get('/', async (req, res) => {
  try {
    let entries = await Entry.find();
    return res.send(entries);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const entry = new Entry({
    date: req.body.date,
    day: req.body.day,
    wakeUp: req.body.wake,
    doseTime: req.body.dose,
    amount: req.body.amount,
    bedTime: req.body.bed,
    cottonBalls: req.body.cotton,
    note: req.body.note,
    tantrums: req.body.tantrums
  });
  try {
    await entry.save();
    return res.send(entry);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// edit
router.put("/:id", async (req, res) => {
  try{
    await Entry.findOneAndUpdate({_id: req.params.id}, {$set: {date: req.body.date, day: req.body.day, wakeUp: req.body.wakeUp, doseTime: req.body.doseTime, amount: req.body.amount, bedTime: req.body.bedTime, cottonBalls: req.body.cottonBalls, note: req.body.note, tantrums: req.body.tantrums}});
  }catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Entry.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
