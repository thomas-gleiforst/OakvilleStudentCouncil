import { getConnection } from 'typeorm'

import { Event } from '../entity/Event'
import { EventDate } from '../entity/EventDate'

/**
 * Inserts dates into the event date
 * @param event - Event typeorm entity
 * @param dates - Formatted date strings
 */
const insertEventDates = async (event: Event, dates: any) => {
  const eventDateRepository = getConnection().getRepository(EventDate)    

  for (const date of dates) {
    const eventDate = new EventDate()
    eventDate.eventDate = new Date(date)
    eventDate.event = event

    await eventDateRepository.save(eventDate)
  }
}

export { insertEventDates };
