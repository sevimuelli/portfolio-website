// sanity.config.js
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import {
    dashboardTool,
    sanityTutorialsWidget,
    projectUsersWidget,
    projectInfoWidget,
} from '@sanity/dashboard';

// import {documentListWidget} from "sanity-plugin-dashboard-widget-document-list";
import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';
import { webhooks } from 'sanity-plugin-webhooks';
import { jokesWidget } from 'sanity-plugin-dashboard-dad-jokes';
import { webhooksTrigger } from 'sanity-plugin-webhooks-trigger';
import schema from './schemas/schema';
import deskStructure from './deskStructure';

const disableMod = [
    'siteSettings',
    'aboutMe',
    'introPage',
    'contact',
    'projectOverview',
    'archive',
];

export default defineConfig({
    name: 'default',
    title: 'Sanity Studio',
    projectId: '34stovf0',
    dataset: 'production',
    plugins: [
        structureTool({
            structure: deskStructure,
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
                            category: 'Code',
                        },
                        {
                            title: 'Studio',
                            value: 'https://severinmueller.ch',
                            category: 'apps',
                        },
                    ],
                }),
                jokesWidget(),
            ],
        }),
        media(),
        visionTool(),
        webhooks(),
        webhooksTrigger({
            // title: 'Deploy',
            // text: 'Custom text',
            // encryptionSalt: 'replace-me-with-a-strong-string'
        }),
    ],
    schema: {
        types: schema,
    },
    document: {
        newDocumentOptions: (prev, { creationContext }) => {
            if (creationContext.type === 'global') {
                return prev.filter((templateItem) => !disableMod.includes(templateItem.templateId));
            }
            return prev;
        },
        actions: (prev, { schemaType }) => {
            if (disableMod.includes(schemaType)) {
                return prev.filter(
                    ({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action),
                );
            }
            return prev;
        },
    },
});
