import {FaTools} from 'react-icons/fa'
import {format, parseISO} from 'date-fns'

export default {
  name: 'sampleProject',
  title: 'Sample project',
  type: 'document',
  icon: FaTools,
  initialValue: {
    aspectRatioImgGal: 0.75
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'featured',
      title: 'Featured project',
      type: 'boolean',
      description: 'When this is selected, is will be shown on the front-page'
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'You can use this field to schedule projects where you show them',
      type: 'datetime'
    },
    {
      name: 'startedAt',
      title: 'Started at',
      type: 'datetime'
    },
    {
      name: 'endedAt',
      title: 'Ended at',
      type: 'datetime'
    },
    {
      name: 'externalLink',
      titel: 'External Link',
      type: 'url'
    },
    {
      name: 'external',
      title: 'Use external Link?',
      type: 'boolean'
    },
    {
      name: 'githubLink',
      title: 'Github Link',
      type: 'url'
    },
    {
      name: 'github',
      title: 'Use GitHub Link?',
      type: 'boolean'
    },
    {
      name: 'tech',
      title: 'Used tech',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}]
    },
    {
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      of: [{type: 'reference', to: {type: 'sampleProject'}}]
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'simplePortableText'
    },
    {
      name: 'introTitle',
      title: 'Intro-Title',
      type: 'string'
    },
    {
      name: 'introText',
      title: 'Intro-Text',
      type: 'projectPortableText'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure'
    },
    {
      name: 'imgGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{type: 'figure'}]
    },
    {
      name: 'aspectRatioImgGal',
      title: 'Aspect ratio Imgage Gallery',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText'
    },
    {
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{type: 'projectMember'}]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    }
  ],
  preview: {
    select: {
      heading: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage',
      featured: 'featured'
    },
    prepare({heading = 'No title', publishedAt, slug = {}, media, featured = false}) {
      const dateSegment = format(parseISO(publishedAt), 'yyyy/MM')
      // const dateSegment = 'sometest'
      const path = `/${dateSegment}/${slug.current}/`
      const title = featured ? `FEA: ${heading}` : heading
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
