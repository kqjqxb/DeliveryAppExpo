import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant name",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200),
    },

    {
      name: "image",
      type: "image",
      title: "Image of the restaurant",
    },

    {
      name: "lat",
      type: "number",
      title: "Latitude of the restaurant",
    },

    {
      name: "long",
      type: "number",
      title: "Longitude of the restaurant",
    },

    {
      name: "address",
      type: "string",
      title: "Restaurant address",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "rating",
      type: "number",
      title: "Enter a rating from (1-5 Stars)",
      validation: (Rule) => Rule.required().min(1).max(5).error("Please enter a Value between 1 and 5"),
    },

    {
      name: "type",
      type: "string",
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{type: "category"}],
    },

    {
      name: "categories_of_dishes",
      type: "array",
      title: "Categories of dishes",
      
      of: [{type: "reference", to: [{type: "categoryForRestScreen"}] }],
    },

    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      
      of: [{type: "reference", to: [{type: "dish"}] }],
    },

    {
      name: "phone",
      type: "string",
      title: "Phone Number",
      validation: (Rule) => Rule.required().regex(/^\+?[0-9]{7,15}$/, {name: "phone"}).error("Please enter a valid phone number"),
    },

    {
      name: "google_map_link",
      type: "url",
      title: "Google Map Link",
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false,
      }).error("Please enter a valid URL"),
    },

    {
      name: "opening_hours",
      type: "object",
      title: "Години роботи",
      fields: [
        {
          name: "monday",
          type: "object",
          title: "Понеділок",
          fields: [
            {
              name: "isClosed",
              type: "boolean",
              title: "Закрито",
              initialValue: false,
            },
            {
              name: "hours",
              type: "string",
              title: "Години",
              hidden: ({ parent }) => parent?.isClosed,
              validation: (Rule) => Rule.required()
                .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: "timeRange",
                  invert: false,
                })
                .error("Будь ласка, введіть коректний діапазон часу (наприклад, 09:00 - 22:00)"),
            },
          ],
        },
        {
          name: "tuesday",
          type: "object",
          title: "Вівторок",
          fields: [
            {
              name: "isClosed",
              type: "boolean",
              title: "Закрито",
              initialValue: false,
            },
            {
              name: "hours",
              type: "string",
              title: "Години",
              hidden: ({ parent }) => parent?.isClosed,
              validation: (Rule) => Rule.required()
                .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: "timeRange",
                  invert: false,
                })
                .error("Будь ласка, введіть коректний діапазон часу (наприклад, 09:00 - 22:00)"),
            },
          ],
        },
        {
          name: "wednesday",
          type: "object",
          title: "Середа",
          fields: [
            {
              name: "isClosed",
              type: "boolean",
              title: "Закрито",
              initialValue: false,
            },
            {
              name: "hours",
              type: "string",
              title: "Години",
              hidden: ({ parent }) => parent?.isClosed,
              validation: (Rule) => Rule.required()
                .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: "timeRange",
                  invert: false,
                })
                .error("Будь ласка, введіть коректний діапазон часу (наприклад, 09:00 - 22:00)"),
            },
          ],
        },
        {
          name: "thursday",
          type: "object",
          title: "Четвер",
          fields: [
            {
              name: "isClosed",
              type: "boolean",
              title: "Закрито",
              initialValue: false,
            },
            {
              name: "hours",
              type: "string",
              title: "Години",
              hidden: ({ parent }) => parent?.isClosed,
              validation: (Rule) => Rule.required()
                .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: "timeRange",
                  invert: false,
                })
                .error("Будь ласка, введіть коректний діапазон часу (наприклад, 09:00 - 22:00)"),
            },
          ],
        },
        {
          name: "friday",
          type: "object",
          title: "П'ятниця",
          fields: [
            {
              name: "isClosed",
              type: "boolean",
              title: "Закрито",
              initialValue: false,
            },
            {
              name: "hours",
              type: "string",
              title: "Години",
              hidden: ({ parent }) => parent?.isClosed,
              validation: (Rule) => Rule.required()
                .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: "timeRange",
                  invert: false,
                })
                .error("Будь ласка, введіть коректний діапазон часу (наприклад, 09:00 - 22:00)"),
            },
          ],
        },
        {
          name: "saturday",
          type: "object",
          title: "Субота",
          fields: [
            {
              name: "isClosed",
              type: "boolean",
              title: "Закрито",
              initialValue: false,
            },
            {
              name: "hours",
              type: "string",
              title: "Години",
              hidden: ({ parent }) => parent?.isClosed,
              validation: (Rule) => Rule.required()
                .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: "timeRange",
                  invert: false,
                })
                .error("Будь ласка, введіть коректний діапазон часу (наприклад, 09:00 - 23:00)"),
            },
          ],
        },
        {
          name: "sunday",
          type: "object",
          title: "Неділя",
          fields: [
            {
              name: "isClosed",
              type: "boolean",
              title: "Закрито",
              initialValue: false,
            },
            {
              name: "hours",
              type: "string",
              title: "Години",
              hidden: ({ parent }) => parent?.isClosed,
              validation: (Rule) => Rule.required()
                .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                  name: "timeRange",
                  invert: false,
                })
                .error("Будь ласка, введіть коректний діапазон часу (наприклад, 09:00 - 23:00)"),
            },
          ],
        },
      ],
      preview: {
        select: {
          monday: 'monday.hours',
          tuesday: 'tuesday.hours',
          wednesday: 'wednesday.hours',
          thursday: 'thursday.hours',
          friday: 'friday.hours',
          saturday: 'saturday.hours',
          sunday: 'sunday.hours',
        },
        prepare(selection) {
          const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = selection
          return {
            title: 'Години роботи',
            subtitle: `Пн: ${monday}, Вт: ${tuesday}, Ср: ${wednesday}, Чт: ${thursday}, Пт: ${friday}, Сб: ${saturday}, Нд: ${sunday}`,
          }
        },
      },
    },

  ],


})
