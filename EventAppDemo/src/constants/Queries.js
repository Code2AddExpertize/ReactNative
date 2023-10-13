const Query = {
  //Create
  CREATE_TABLE_EVENTS: `CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT,dateToShow TEXT,time TEXT, location TEXT,event_type TEXT,registration_type TEXT,amount INTEGER,by TEXT,email TEXT)`,
  CREATE_TABLE_NOMINATIONS: `CREATE TABLE nominations (
        id INTEGER PRIMARY KEY,
        email TEXT,
        event_ID TEXT,
        FOREIGN KEY (email, event_ID) REFERENCES events (email, id)
      )`,

  //Delete
  DELETE_EVENT: `DELETE FROM events WHERE id = ?`,

  //Insert
  INSERT_INTO_EVENT: `INSERT INTO events (name, date,dateToShow,time, location,event_type,registration_type,amount,by,email) values (?,?,?,?,?,?,?,?,?,?)`,
  INSERT_INTO_NOMINATIONS: `INSERT INTO nominations (email,event_ID) values (?,?)`,

  //Update
  UPDATE: `UPDATE events SET name=?, date=?,dateToShow=?, time=?, location=?, event_type=?, registration_type=?, amount=?,by=?,email=? WHERE id=?`,

  //Read
  READ_ALL: `SELECT * FROM events ORDER BY DATE(date) DESC`,
  READ_ALL_NOMI: `SELECT * FROM nominations `,
  READ_MY_EVENTS_BY_EMAIL: `SELECT * FROM events WHERE email = ? ORDER BY DATE(date) DESC`,
  READ_BY_EMAIL_AND_NOMI: `SELECT * FROM events WHERE email = ?1
  UNION
  SELECT e.*
  FROM events e
  INNER JOIN nominations n ON e.id = n.event_ID
  WHERE n.email = ?1`,
  
  READ_OTHER_EVENTS: `SELECT * FROM events WHERE email <> ? ORDER BY DATE(date) DESC`,
  READ_OTHER_EVENTS_2: `SELECT *
  FROM events
  WHERE id not IN (
      SELECT event_ID
      FROM nominations where email=?1
  ) and email <> ?1`,
};
export default Query;
