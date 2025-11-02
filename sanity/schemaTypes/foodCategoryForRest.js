import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'categoryForRestScreen',
  title: 'Food category',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Category name',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'image',
      type: 'image',
      title: 'Image of the food category',

    },

    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      
      of: [{type: "reference", to: [{type: "dish"}] }],
    },
  ],
})
