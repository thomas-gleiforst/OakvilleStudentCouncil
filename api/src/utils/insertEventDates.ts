import { getConnection, getRepository } from 'typeorm'

import { Event } from '../entity/Event'
import { EventDate } from '../entity/EventDate'

/**
 * Inserts dates into the event date
 * @param event - Event typeorm entity
 * @param dates - Formatted date strings
 */
// TODO: Error catching
const insertEventDates = async (event, dates) => {
  const eventDateRepository = getConnection().getRepository(EventDate)    

  for (const date of dates) {
    const eventDate = new EventDate()
    eventDate.eventDate = new Date(date)
    eventDate.event = event

    await eventDateRepository.save(eventDate)
  }
}

export { insertEventDates };
