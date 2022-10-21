/**
 * Templates
 */
const templates = {
  guitars: {
    'G-PRS-C24-6': {
      label: 'PRS Custom 24',
      strings: 6,
      steps: 24,
      imgSrc: 'templates/G-PRS-C24-6.png',
    },
    'G-GIBSON-LP-STD-6': {
      label: 'Gibson Les Paul Standard',
      strings: 6,
      steps: 22,
      imgSrc: 'templates/G-GIBSON-LP-STD-6.png',
    },
    'G-FENDER-TELE-6': {
      label: 'Fender American Pro II Telecaster',
      strings: 6,
      steps: 22,
      imgSrc: 'templates/G-FENDER-TELE-6.png',
    },
    'G-FENDER-STRATO-6': {
      label: 'Fender Vintera 60s Stratocaster',
      strings: 6,
      steps: 22,
      imgSrc: 'templates/G-FENDER-STRATO-6.png',
    },
    'G-SB-BODEN-7': {
      label: 'Strandberg Boden 7',
      strings: 7,
      steps: 24,
      imgSrc: 'templates/G-SB-BODEN-7.png',
    },
    'G-SOLAR-TAB-7': {
      label: 'Solar Type AB 7',
      strings: 7,
      steps: 24,
      imgSrc: 'templates/G-SOLAR-TAB-7.png',
    },
  },
  basses: {
    'B-SQUIER-VM-JAZZ-5': {
      label: 'Squier Jazz Bass V Vintage Modified 70s',
      strings: 5,
      steps: 20,
      imgSrc: 'templates/B-SQUIER-VM-JAZZ-5.png',
    },
  },
  midi_controllers: {
    'M-ARTURIA-MINILAB-1': {
      label: 'Arturia MiniLab MKII White',
      strings: 1,
      steps: 25,
      imgSrc: 'templates/M-ARTURIA-MINILAB-1.png',
    },
  },
};

/**
 * All Templates
 */
const allTemplates = {
  ...templates.guitars,
  ...templates.basses,
  ...templates.midi_controllers,
};

/**
 * Returns a list of templates
 *
 * @returns {Array} The tunning options
 */
const getTemplateList = (category) => {
  const templatesItem = templates[category];
  const resultList = [];
  Object.keys(templatesItem).forEach((template) => {
    resultList.push({
      label: templatesItem[template].label,
      value: template,
    });
  });
  return resultList;
};

export { templates, allTemplates, getTemplateList };
