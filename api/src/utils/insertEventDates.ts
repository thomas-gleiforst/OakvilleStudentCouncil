import { getConnection } from 'typeorm'

import { EventDate } from '../entity/EventDate'

/**
 * Inserts dates into the event date
 * @param eventID
 * @param dates - Formatted date strings
 */
// TODO: Error catching
const insertEventDates = async (eventID, dates) => {
  // Generate dateObjects with eventID and converted Date
  const dateObjects = dates.map((date) => {
    return {
      eventID: eventID,
      eventDate: date
    }
  })

  console.log(dateObjects)
  // Insert dateobjects into database
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(EventDate)
    .values(dateObjects)
    .execute()
}

export { insertEventDates };
