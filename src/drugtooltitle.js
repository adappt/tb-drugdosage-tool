export const titleTemplates = {
  en: {
    'Drug-Susceptible TB': (age, weight, months, regimenName) =>
      `Drug dosage for a person aged ${age == 0 ? `${months} months` : `${age} years`
      } and weighing ${weight} kg on the ${regimenName} regimen for DS-TB`,
    'Rifampicin-susceptible, Isoniazid-resistant TB (Hr-TB)': (
      age,
      weight,
      months,
    ) =>
      `Drug dosage for a person aged ${age == 0 ? `${months} months` : `${age} years`
      } and weighing ${weight} kg on a regimen for Rifampicin-susceptible, Isoniazid-resistant TB (Hr-TB)`,
    '9-month all-oral': (age, weight, months) =>
      `Drug dosage for a person aged ${age == 0 ? `${months} months` : `${age} years`
      } and weighing ${weight} kg on the 9-month all-oral regimen`,
    'BPaLM/BPaL': (age, weight, months) =>
      `Drug dosage for a person aged ${age == 0 ? `${months} months` : `${age} years`
      } and weighing ${weight} kg on BPaLM/BPaL`,
    'Longer individualized regimens': (age, weight, months) =>
      `Drug dosage for a person aged ${age == 0 ? `${months} months` : `${age} years`
      } and weighing ${weight} kg on a longer individualized regimen`,
  },
  fr: {
    'Tuberculose pharmacosensible': (age, weight, months, regimenName) =>
      `Posologie du médicament pour une personne âgée de ${age == 0 ? `${months} mois` : `${age} ans`
      } et pesant ${weight} kg sur le schéma thérapeutique ${regimenName} pour la TB sensible aux médicaments`,
    "Tuberculose sensible à la rifampicine et résistante à l'isoniazide (Hr-TB)":
      (age, weight, months) =>
        `Posologie du médicament pour une personne âgée de ${age == 0 ? `${months} mois` : `${age} ans`
        } et pesant ${weight} kg sous schéma thérapeutique Tuberculose sensible à la rifampicine et résistante à l'isoniazide (Hr-TB)`,
    'Schéma thérapeutique entièrement oral de 9 mois': (age, weight, months) =>
      `Posologie du médicament pour une personne âgée de ${age == 0 ? `${months} mois` : `${age} ans`
      } et pesant ${weight} kg  sous schéma thérapeutique entièrement oral de 9 mois`,
    'BPaLM/BPaL': (age, weight, months) =>
      `Posologie du médicament pour une personne âgée de ${age == 0 ? `${months} mois` : `${age} ans`
      } et pesant ${weight} kg sous schéma thérapeutique BPaLM/BPaL`,
    'Schémas thérapeutiques longs et individualisés': (age, weight, months) =>
      `Posologie du médicament pour une personne âgée de ${age == 0 ? `${months} mois` : `${age} ans`
      } et pesant ${weight} kg sous schéma thérapeutique individualisé plus long`,
  },
  ru: {
    'Drug-Susceptible TB': (age, weight, months, regimenName) =>
      `Дозировка препарата для лица в возрасте ${age == 0 ? `${months} месяцев` : `${age} лет`
      } и весом ${weight} кг по схеме ${regimenName} для чувствительного к препаратам туберкулеза`,
    'Rifampicin-susceptible, Isoniazid-resistant TB (Hr-TB)': (
      age,
      weight,
      months,
    ) =>
      `Дозировка препарата для лица в возрасте ${age == 0 ? `${months} месяцев` : `${age} лет`
      } и весом ${weight} кг по схеме для туберкулеза, устойчивого к рифампицину и резистентного к изониазиду (Hr-TB)`,
    '9-month all-oral': (age, weight, months) =>
      `Дозировка препарата для лица в возрасте ${age == 0 ? `${months} месяцев` : `${age} лет`
      } и весом ${weight} кг по схеме перорального приема препаратов в течение 9 месяцев`,
    'BPaLM/BPaL': (age, weight, months) =>
      `Дозировка препарата для лица в возрасте ${age == 0 ? `${months} месяцев` : `${age} лет`
      } и весом ${weight} кг по схеме BPaLM/BPaL`,
    'Longer individualized regimens': (age, weight, months) =>
      `Дозировка препарата для лица в возрасте ${age == 0 ? `${months} месяцев` : `${age} лет`
      } и весом ${weight} кг по индивидуальной удлиненной схеме терапии`,
  },
  es: {
    'Drug-Susceptible TB': (age, weight, months, regimenName) =>
      `Dosis del medicamento para una persona de ${age == 0 ? `${months} meses` : `${age} años`
      } y peso ${weight} kg en el régimen ${regimenName} para TB sensible a fármacos`,
    'Rifampicin-susceptible, Isoniazid-resistant TB (Hr-TB)': (
      age,
      weight,
      months,
    ) =>
      `Dosis del medicamento para una persona de ${age == 0 ? `${months} meses` : `${age} años`
      } y peso ${weight} kg en un régimen para TB a rifampicina-sensible, isoniazida-resistente (Hr-TB)`,
    '9-month all-oral': (age, weight, months) =>
      `Dosis del medicamento para una persona de ${age == 0 ? `${months} meses` : `${age} años`
      } y peso ${weight} kg en el régimen oral de 9 meses`,
    'BPaLM/BPaL': (age, weight, months) =>
      `Dosis del medicamento para una persona de ${age == 0 ? `${months} meses` : `${age} años`
      } y peso ${weight} kg en el régimen BPaLM/BPaL`,
    'Longer individualized regimens': (age, weight, months) =>
      `Dosis del medicamento para una persona de ${age == 0 ? `${months} meses` : `${age} años`
      } y peso ${weight} kg en un régimen individualizado más prolongado`,
  },
};
export const compareLabel = {
  en: {
    DSTB: 'Drug-Susceptible TB',
    DRTB: 'Drug-Resistant TB',
    MDRTB: 'MDR/RR-TB',
    LRG: 'Longer individualized regimens',
    nmonthoral: '9-month all-oral',
  },
  fr: {
    DSTB: 'Tuberculose pharmacosensible',
    DRTB: 'Tuberculose pharmacorésistante',
    MDRTB: 'TB-MR/RR',
    LRG: 'Schémas thérapeutiques longs et individualisés',
    nmonthoral: 'Schéma thérapeutique entièrement oral de 9 mois',
  },
  es: {
    DSTB: 'Drug-Susceptible TB',
    DRTB: 'Drug-Resistant TB',
    MDRTB: 'MDR/RR-TB',
    LRG: 'Longer individualized regimens',
    nmonthoral: '9-month all-oral',
  },
  ru: {
    DSTB: 'Drug-Susceptible TB',
    DRTB: 'Drug-Resistant TB',
    MDRTB: 'MDR/RR-TB',
    LRG: 'Longer individualized regimens',
    nmonthoral: '9-month all-oral',
  },
};

export const weightJson = [
  {
    start: 1,
    end: 3,
    value: '1to3',
  },
  {
    start: 4,
    end: 7,
    value: '4to7',
  },
  {
    start: 8,
    end: 11,
    value: '8to11',
  },
  {
    start: 12,
    end: 15,
    value: '12to15',
  },
  {
    start: 16,
    end: 24,
    value: '16to24',
  },
  {
    start: 25,
    end: 29,
    value: '25to29',
  },
  {
    start: 30,
    end: 34,
    value: '30to34',
  },
  {
    start: 35,
    end: 49,
    value: '35to49',
  },
  {
    start: 50,
    end: 64,
    value: '50to64',
  },
  {
    start: 65,
    end: Infinity,
    value: '>65',
  },
];

export const weightRange = [
  {
    start: '0',
    end: '2',
    value: '3less',
  },
  {
    start: '3',
    end: '4',
    value: '3to4',
  },
  {
    start: '5',
    end: '6',
    value: '5to6',
  },
  {
    start: '7',
    end: '9',
    value: '7to9',
  },
  {
    start: '10',
    end: '15',
    value: '10to15',
  },
  {
    start: '16',
    end: '23',
    value: '16to23',
  },
  {
    start: '24',
    end: '29',
    value: '24to29',
  },
  {
    start: '30',
    end: '35',
    value: '30to35',
  },
  {
    start: '36',
    end: '45',
    value: '36to45',
  },
  {
    start: '46',
    end: '55',
    value: '46to55',
  },
  {
    start: '56',
    end: '69',
    value: '56to69',
  },
  {
    start: '70',
    end: Infinity,
    value: '70',
  },
];
export const translations = {
  en: {
    Ethionamide: 'Ethionamide',
    'Ethionamide or prothionamide': 'Ethionamide or prothionamide',
    '125 mg dt (Eto)': '125 mg dt (Eto)',
  },
  fr: {
    Ethionamide: 'Éthionamide',
    'Ethionamide or prothionamide': 'Éthionamide ou prothionamide',
    '125 mg dt (Eto)': '125 mg comp. disp. (Eto)',
  },
  es: {
    Ethionamide: 'Ethionamide',
    'Ethionamide or prothionamide': 'Ethionamide or prothionamide',
    '125 mg dt (Eto)': '125 mg dt (Eto)',
  },
  ru: {
    Ethionamide: 'Ethionamide',
    'Ethionamide or prothionamide': 'Ethionamide or prothionamide',
    '125 mg dt (Eto)': '125 mg dt (Eto)',
  },
};
