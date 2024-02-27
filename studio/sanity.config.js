// sanity.config.js
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {
  dashboardTool,
  sanityTutorialsWidget,
  projectUsersWidget,
  projectInfoWidget,
} from "@sanity/dashboard";

// import {documentListWidget} from "sanity-plugin-dashboard-widget-document-list";
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'
import {media} from 'sanity-plugin-media'
import {visionTool} from '@sanity/vision'
import schema from './schemas/schema'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'PortfolioWithGatsbyAndSanity',
  projectId: '34stovf0',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: deskStructure
    }),
    dashboardTool({
      widgets: [
        // documentListWidget(),
        sanityTutorialsWidget(),
        projectUsersWidget(),
        projectInfoWidget({
          data: [
            {
              title: 'GitHub repo',
              value: 'https://github.com/sevimuelli/portfolio-website',
              category: 'Code'
            },
            {
              title: 'Studio',
              value: 'https://severinmueller.ch',
              category: 'apps'
            }
          ]
        }),
        netlifyWidget({
          title: 'My Netlify deploys',
          sites: [
            {
              title: 'Sanity Studio',
              apiId: '5b4db275-9ce1-46a9-9aa7-e218428ae77d',
              buildHookId: '5e30d6a3e3ba019f373b1eba',
              name: 'portfolio-website-sanity-studio',
            },
            {
              title: 'Portfolio Website',
              apiId: '897668a5-6c1b-4571-84cb-fbb367f8baaf',
              // buildHookId: 'yyyyxxxxxyyyxxdxxx',
              name: 'gatsby-sanity-portfolio-gatsbycloud',
              url: 'https://severinmueller.io',
            }
          ]
      })
      ]}),
    media(),
    visionTool()
  ],
  schema: {
    types: schema,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId != 'siteSettings')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'siteSettings') {
        return prev.filter(({ action }) => !['unpublish', 'delete','duplicate'].includes(action))
      }
      return prev
    },
  },
})
