import { getConnection } from "typeorm"

import { Event } from "../entity/Event"
import { EventDate } from "../entity/EventDate"

type Location = {
  address?: string
  room: string
}

/**
 * Inserts dates into the event date
 * @param event - Event typeorm entity
 * @param dates - Formatted date strings
 */
const insertEventDates = async (
  event: Event,
  dates: string,
  location: Location
) => {
  const eventDateRepository = getConnection().getRepository(EventDate)

  for (const date of dates) {
    const eventDate = new EventDate()
    eventDate.date = new Date(date)
    eventDate.event = event
    eventDate.address = location.address || null
    eventDate.room = location.room

    await eventDateRepository.save(eventDate)
  }
}

export { insertEventDates }
