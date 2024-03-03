import { MdSettings, MdPerson, MdContactMail } from 'react-icons/md';
import { FaHome, FaArchive } from 'react-icons/fa';
import { GiMagnifyingGlass } from 'react-icons/gi';

const hiddenDocTypes = (listItem) =>
    ![
        'category',
        'person',
        'sampleProject',
        'siteSettings',
        'introPage',
        'aboutMe',
        'contact',
        'projectOverview',
        'archive',
        'tag',
    ].includes(listItem.getId());

export default (S) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Settings')
                .child(
                    S.editor()
                        .id('siteSettings')
                        .schemaType('siteSettings')
                        .documentId('siteSettings'),
                )
                .icon(MdSettings),
            S.listItem()
                .title('IntroPage')
                .id('intro')
                .child(S.editor().id('introPage').schemaType('introPage').documentId('introPage'))
                .icon(FaHome),
            S.listItem()
                .title('About me')
                .id('about')
                .child(S.editor().id('aboutMe').schemaType('aboutMe').documentId('aboutMe'))
                .icon(MdPerson),
            S.listItem()
                .title('Contact')
                .id('contactPage')
                .child(S.editor().id('contact').schemaType('contact').documentId('contact'))
                .icon(MdContactMail),
            S.divider(),
            S.listItem()
                .title('Project overview')
                .id('overview')
                .child(
                    S.editor()
                        .id('projectOverview')
                        .schemaType('projectOverview')
                        .documentId('projectOverview'),
                )
                .icon(GiMagnifyingGlass),
            S.listItem()
                .title('Sample projects')
                .schemaType('sampleProject')
                .child(S.documentTypeList('sampleProject').title('Sample projects')),
            S.listItem()
                .title('Archive')
                .id('archiveSettings')
                .child(S.editor().id('archive').schemaType('archive').documentId('archive'))
                .icon(FaArchive),
            S.listItem()
                .title('Tags')
                .schemaType('tag')
                .child(S.documentTypeList('tag').title('Tags')),
            S.divider(),
            S.listItem()
                .title('People')
                .schemaType('person')
                .child(S.documentTypeList('person').title('People')),
            S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(S.documentTypeList('category').title('Categories')),
            // This returns an array of all the document types
            // defined in schema.js. We filter out those that we have
            // defined the structure above
            ...S.documentTypeListItems().filter(hiddenDocTypes),
        ]);
