module.exports = {
  siteTitle: 'Severin Müller | Software Engineer | Nerd',
  siteDescription:
    'Severin Müller is a software engineer based in Zurich, CH who likes do develop all kind of awesome things.',
  siteKeywords:
    'Severin Mülller, Severin Mueller, Severin Muller, Severin, Müller, sevimuelli, software engineer, hobbyist, nerd, front-end engineer, web developer, javascript, python, c++, c, machine learning, deep learning, ai, robot, robotics',
  siteUrl: 'https://severinmueller.io',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-159364889-1',
  googleVerification: '',
  name: 'Severin Müller',
  location: 'Zurich, CH',
  github: 'https://github.com/sevimuelli',
  twitterHandle: '@Sevimuelli',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/sevimuelli',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/severin-m-19867514a',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,
  greenColor: '#64ffda',
  navyColor: '#0a192f',
  darkNavyColor: '#020c1b',

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
