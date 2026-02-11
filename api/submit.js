import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Nur POST erlaubt" });
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const db = client.db("eventDB"); // Datenbankname
    const collection = db.collection("anmeldungen"); // Collection

    const data = req.body;
    data.timestamp = new Date();

    await collection.insertOne(data);
    await client.close();

    return res.status(200).json({ success: true, message: "Anmeldung erfolgreich!" });
  } catch (err) {
    console.error("DB Fehler:", err);
    return res.status(500).json({ error: "Fehler beim Speichern der Daten" });
  }
}



