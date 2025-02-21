var express = require('express');
var router = express.Router();
const db = require("../model/helper")

/* GET home page. */
router.get('/', function (req, res) {
  res.send({ title: 'Express' });
});

// GET my schedules list
//  /schedule

router.get("/schedule", async (req, res) => {
  try {
    const query = "SELECT * FROM Schedule ORDER BY schedule_id ASC"; // 1-create the query
    const results = await db(query); // 2-send the query to the DB
    res.status(200).json(results.data); // 3-send back the result
  } catch (error) {
    res.status(500).json({ message: error.message }); // .message is a built-in property that will describe the error to the user
  }
});

// GET one schedule from my schedules list
//  /schedule/:schedule_id

router.get("/schedule/:schedule_id", async (req, res) => {
  const scheduleId = req.params.schedule_id;
  try {
    const query = `SELECT * FROM Schedule WHERE schedule_id = ${scheduleId}`; // 1-create the query
    const results = await db(query); // 2-send the query to the DB
    res.status(200).json(results.data[0]); // 3-send back the result
  } catch (error) {
    res.status(500).json({ message: error.message }); // .message is a built-in property that will describe the error to the user
  }
});

// GET all the items of a schedule
//  /schedule/:schedule_id/items

router.get("/schedule/:schedule_id/items", async (req, res) => {
  const scheduleId = req.params.schedule_id;
  try {
    const query = `SELECT * FROM ScheduleItem WHERE schedule_id = ${scheduleId} ORDER BY item_order ASC`; // 1-create the query
    const results = await db(query); // 2-send the query to the DB
    res.status(200).json(results.data); // 3-send back the result
  } catch (error) {
    res.status(500).json({ message: error.message }); // .message is a built-in property that will describe the error to the user
  }
});

// // GET one item from my items list
// //  /schedule/:schedule_id/items/:item_id
// router.get("/schedule/:schedule_id/items/:item_id", async (req, res) => {
//   const scheduleId = req.params.schedule_id;
//   const itemId = req.params.item_id;
//   try {
//     const query = `SELECT * FROM ScheduleItem WHERE schedule_id = ${scheduleId} AND item_id = ${itemId}`; // 1-create the query
//     const results = await db(query); // 2-send the query to the DB
//     res.status(200).json(results.data); // 3-send back the result
//   } catch (error) {
//     res.status(500).json({ message: error.message }); // .message is a built-in property that will describe the error to the user
//   }
// });


// POST(insert) a new schedule into the Schedule table / list
//  /schedule
router.post("/schedule", async (req, res) => {
  try {
    const query = await db(
      `INSERT INTO Schedule
      (schedule_name)
      VALUES ("${req.body.schedule_name}"); 
      SELECT LAST_INSERT_ID()`
    );
    console.log(query);
    const scheduleId = query.data[0].insertId;
    const schedules = await db(`SELECT * FROM Schedule WHERE schedule_id = ${scheduleId}`); // get the new data to paste in the response
    res.status(200).json(schedules.data[0]); // send back the updated list and row values

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// POST new item on my schedule
//  /schedule/:schedule_id/items

router.post("/schedule/:schedule_id/items", async (req, res) => {
  try {
    const scheduleId = req.params.schedule_id;
    const locationName = req.body.location_name;
    const locationLat = req.body.lat;
    const locationLng = req.body.lng;

    if (scheduleId === undefined) {
      throw new Error("required: schedule_id");
    }
    if (locationName === undefined) {
      throw new Error("required: location_name");
    }
    if (locationLat === undefined) {
      throw new Error("required: lat");
    }
    if (locationLng === undefined) {
      throw new Error("required: lng");
    }

    // get all of the existing items belonging to this schedule
    const oldItemsOrder = await db(
      `SELECT *
      FROM ScheduleItem
      WHERE schedule_id = ${scheduleId}`
    );

    // the new item's item_order is the number of items + 1
    const item_order = oldItemsOrder.data.length + 1;

    await db(
      `INSERT INTO ScheduleItem
      (schedule_id, location_name, lat, lng, item_order)
      VALUES (
        "${scheduleId}",
        "${locationName}",
        ${locationLat},
        ${locationLng},
        ${item_order}
      )`
    );

    // send back the updated list
    const items = await db(
      `SELECT * FROM ScheduleItem
      WHERE schedule_id=${scheduleId}
      ORDER BY item_order ASC`
    );
    res.status(200).json(items.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETE one schedule from my schedules list (delete it from the 2 tables)
//  /schedule/:schedule_id`

router.delete("/schedule/:schedule_id", async (req, res) => {
  try {
    const scheduleId = req.params.schedule_id;
    const results = await db(`SELECT * FROM Schedule WHERE schedule_id = ${scheduleId}`);
    if (results.data.length !== 1) {
      return res.status(404).json({ message: "Item not found" });
    }
    await db(`DELETE FROM ScheduleItem WHERE schedule_id = ${scheduleId}`);
    await db(`DELETE FROM Schedule WHERE schedule_id = ${scheduleId}`);
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETE an item on one X schedule
//  /schedule/:schedule_id/items/:item_id

router.delete("/schedule/:schedule_id/items/:item_id", async (req, res) => {
  try {
    const scheduleId = req.params.schedule_id;
    const itemId = req.params.item_id;
    const results = await db(
      `SELECT * FROM ScheduleItem
      WHERE schedule_id = ${scheduleId} AND item_id = ${itemId}`
    );
    if (results.data.length !== 1) {
      return res.status(404).json({ message: "Item not found" });
    }
    const item = results.data[0];
    await db(`DELETE FROM ScheduleItem WHERE item_id = ${itemId}`);
    await db(
      `UPDATE ScheduleItem
      SET item_order=item_order-1
      WHERE
        schedule_id = ${scheduleId}
        AND item_order > ${item.item_order}`
    );
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


module.exports = router;
