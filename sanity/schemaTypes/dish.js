// import {defineField, defineType} from 'sanity'

// export default defineType({
//   name: 'dish',
//   title: 'Dish',
//   type: 'document',
//   fields: [
//     {
//       name: 'name',
//       type: 'string',
//       title: 'Name of dish',
//       validation: (Rule) => Rule.required(),
//     },

//     {
//       name: 'short_description',
//       type: 'string',
//       title: 'Short description',
//       validation: (Rule) => Rule.max(200),
//     },

//     {
//       name: 'price',
//       type: 'number',
//       title: 'Price of the dish in GBP',
//     },
    
//     {
//       name: 'image',
//       type: 'image',
//       title: 'Image of the dish',
//     },
    
//     {
//       name: "type",
//       title: "Food Category",
//       validation: (Rule) => Rule.required(),
//       type: "reference",
//       to: [{type: "categoryForRestScreen"}],
//     },
//   ],
// })





import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of dish',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price of the dish in UAH',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'priceUSD',
      type: 'number',
      title: 'Price in USD',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the dish',
    },
    {
      name: 'type',
      title: 'Food Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'categoryForRestScreen'}],
    },
    {
      name: 'weight',
      type: 'number',
      title: 'Weight (grams)',
      hidden: ({ parent }) => parent?.type !== 'food',
    },
    {
      name: 'volume',
      type: 'object',
      title: 'Volume',
      hidden: ({ parent }) => parent?.type !== 'drink',
      fields: [
        {
          name: 'milliliters',
          type: 'number',
          title: 'Milliliters',
        },
        {
          name: 'liters',
          type: 'number',
          title: 'Liters',
        },
      ],
    },
    {
      name: 'extras',
      type: 'array',
      title: 'Extras',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Extra Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              type: 'number',
              title: 'Extra Price',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'maxQuantity',
              type: 'number',
              title: 'Max Quantity',
              validation: (Rule) => Rule.required().min(1),
            },
          ],
        },
      ],
    },
  ],
})
