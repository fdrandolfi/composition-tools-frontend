/**
 * Templates
 */
const templates = {
  guitars: {
    'G-PRS-SE-C24-6': {
      label: 'PRS SE Custom 24',
      strings: 6,
      steps: 24,
      imgSrc: 'templates/G-PRS-SE-C24-6.png',
    },
    'G-DEAN-CADILLAC-1980-6': {
      label: 'Dean Cadillac 1980',
      strings: 6,
      steps: 22,
      imgSrc: 'templates/G-DEAN-CADILLAC-1980-6.png',
    },
    'G-GIBSON-LP-STD-6': {
      label: 'Gibson Les Paul Standard',
      strings: 6,
      steps: 22,
      imgSrc: 'templates/G-GIBSON-LP-STD-6.png',
    },
    'G-FENDER-TELE-6': {
      label: 'Fender Telecaster American Pro II ',
      strings: 6,
      steps: 22,
      imgSrc: 'templates/G-FENDER-TELE-6.png',
    },
    'G-FENDER-STRATO-6': {
      label: 'Fender Stratocaster American Vintage II 1971 ',
      strings: 6,
      steps: 22,
      imgSrc: 'templates/G-FENDER-STRATO-6.png',
    },
    'G-IBANEZ-RG350EX-6': {
      label: 'Ibanez RG 350EX',
      strings: 6,
      steps: 24,
      imgSrc: 'templates/G-IBANEZ-RG350EX-6.png',
    },
    'G-SB-BODEN-6': {
      label: 'Strandberg Boden N2.6 Standard',
      strings: 6,
      steps: 24,
      imgSrc: 'templates/G-SB-BODEN-6.png',
    },
    'G-SIGMA-DME-6': {
      label: 'Sigma SE DME',
      strings: 6,
      steps: 20,
      imgSrc: 'templates/G-SIGMA-DME-6.png',
    },
    'G-ABASI-LARADA-J-7': {
      label: 'Abasi Larada J Series 7',
      strings: 7,
      steps: 24,
      imgSrc: 'templates/G-ABASI-LARADA-J-7.png',
    },
    'G-ABASI-LARADA-J-8': {
      label: 'Abasi Larada J Series 8',
      strings: 8,
      steps: 24,
      imgSrc: 'templates/G-ABASI-LARADA-J-8.png',
    },
  },
  basses: {
    'B-SQUIER-VM-JAZZ-5': {
      label: 'Squier Jazz Bass V Vintage Modified 70s',
      strings: 5,
      steps: 20,
      imgSrc: 'templates/B-SQUIER-VM-JAZZ-5.png',
    },
    'B-IBANEZ-STANDARD-SR300E-4': {
      label: 'Ibanez Standard SR300E',
      strings: 4,
      steps: 24,
      imgSrc: 'templates/B-IBANEZ-STANDARD-SR300E-4.png',
    },
  },
  midi_controllers: {
    'M-ARTURIA-MINILAB-1': {
      label: 'Arturia MiniLab MKII',
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

/**
 * Returns the label of a template by ID
 *
 * @param {String} id - The template ID
 * @returns {String} The label of the template
 */
const getTemplateLabelById = (id) => {
  if (allTemplates[id]) return allTemplates[id].label;
  return null;
};

export {
  templates, allTemplates, getTemplateList, getTemplateLabelById,
};
