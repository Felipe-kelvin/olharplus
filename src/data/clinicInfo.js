export const ESPECIALIDADES = [
  { id: 'estrabismo', nome: 'Estrabismo', icone: 'eye-outline' },
  { id: 'catarata', nome: 'Catarata', icone: 'sunny-outline' },
  { id: 'glaucoma', nome: 'Glaucoma', icone: 'water-outline' },
  { id: 'cornea', nome: 'Córnea', icone: 'aperture-outline' },
];

export const MEDICOS = {
  estrabismo: [
    { id: '1', nome: 'Dr. Luís Fernando', sub: 'CRM 12345 · 8 anos de experiência' },
    { id: '2', nome: 'Dra. Camila Rocha', sub: 'CRM 54321 · 5 anos de experiência' },
  ],
  catarata: [
    { id: '3', nome: 'Dr. André Souza', sub: 'CRM 98765 · 12 anos de experiência' },
  ],
  glaucoma: [
    { id: '4', nome: 'Dra. Beatriz Lima', sub: 'CRM 11223 · 10 anos de experiência' },
  ],
  cornea: [
    { id: '5', nome: 'Dr. Rafael Gomes', sub: 'CRM 33445 · 7 anos de experiência' },
  ],
};

export const EXAMES = [
  'Mapeamento de retina',
  'Tonometria',
  'Campimetria visual',
  'Fundoscopia',
];

export const CLINICA = {
  endereco: 'Av. das Palmeiras, 420 · Centro\nSão Paulo - SP',
  horarios: [
    { dias: 'Segunda a sexta', horario: '08h às 18h' },
    { dias: 'Sábado', horario: '08h às 12h' },
    { dias: 'Domingo', horario: 'Fechado' },
  ],
  whatsapp: '5599991663566',
};
