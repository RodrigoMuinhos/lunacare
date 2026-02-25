export interface Patient {
  id: string;
  name: string;
  age: number;
  clinicalActive: boolean;
  lastActivity: string;
  alerts: number;
  contraceptive?: string;
  nextPeriod?: string;
}

const firstNames = [
  'Ana', 'Maria', 'Julia', 'Beatriz', 'Carolina', 'Fernanda', 'Gabriela', 'Helena', 'Isabella', 'Juliana',
  'Laura', 'Mariana', 'Natalia', 'Patricia', 'Rafaela', 'Sabrina', 'Tatiana', 'Vanessa', 'Amanda', 'Bruna',
  'Camila', 'Daniela', 'Eduarda', 'Fabiana', 'Giovanna', 'Larissa', 'Leticia', 'Melissa', 'Olivia', 'Paula',
  'Renata', 'Sofia', 'Thais', 'Vitoria', 'Yasmin', 'Adriana', 'Aline', 'Bianca', 'Carla', 'Debora',
  'Elisa', 'Flavia', 'Gisele', 'Ingrid', 'Jessica', 'Karina', 'Luciana', 'Michele', 'Nicole', 'Priscila',
  'Raquel', 'Sandra', 'Tamires', 'Valeria', 'Viviane', 'Andreia', 'Barbara', 'Claudia', 'Denise', 'Erica'
];

const lastNames = [
  'Silva', 'Santos', 'Costa', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima',
  'Gomes', 'Martins', 'Araujo', 'Ribeiro', 'Carvalho', 'Rocha', 'Almeida', 'Nascimento', 'Barbosa', 'Cardoso',
  'Dias', 'Moreira', 'Monteiro', 'Mendes', 'Freitas', 'Castro', 'Cavalcanti', 'Lopes', 'Campos', 'Ramos',
  'Pinto', 'Teixeira', 'Vieira', 'Fernandes', 'Cunha', 'Duarte', 'Correia', 'Barros', 'Nunes', 'Melo',
  'Soares', 'Machado', 'Azevedo', 'Moura', 'Nogueira', 'Farias', 'Pires', 'Moraes', 'Sampaio', 'Medeiros',
  'Andrade', 'Batista', 'Coelho', 'Xavier', 'Fonseca', 'Porto', 'Miranda', 'Leite', 'Rezende', 'Pacheco'
];

const contraceptives = [
  'Yasmin (21 comp.)',
  'Selene (24 comp.)',
  'DIU Mirena',
  'DIU de Cobre',
  'Elani Ciclo (21 comp.)',
  'Tamisa 20 (24 comp.)',
  'Cerazette (28 comp.)',
  'Microvlar (21 comp.)',
  'Qlaira (28 comp.)',
  'Implante Implanon',
  'Nuvaring (anel)',
  'Evra (adesivo)',
  'Depo-Provera (injetável)',
  'Mesigyna (injetável)'
];

const activities = [
  'Há 1 hora',
  'Há 2 horas',
  'Há 3 horas',
  'Há 5 horas',
  'Hoje',
  'Ontem',
  'Há 2 dias',
  'Há 3 dias',
  'Esta semana',
  'Semana passada'
];

const generatePatients = (): Patient[] => {
  const patients: Patient[] = [];
  
  for (let i = 0; i < 60; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const age = Math.floor(Math.random() * (45 - 18 + 1)) + 18; // 18-45 anos
    const clinicalActive = Math.random() > 0.3; // 70% tem Clinical ativo
    const hasAlert = Math.random() > 0.85; // 15% tem alertas
    const alertCount = hasAlert ? Math.floor(Math.random() * 3) + 1 : 0;
    const contraceptive = contraceptives[Math.floor(Math.random() * contraceptives.length)];
    const nextPeriodDays = Math.floor(Math.random() * 28) + 1;
    const activity = activities[Math.floor(Math.random() * activities.length)];

    patients.push({
      id: String(i + 1),
      name: `${firstName} ${lastName}`,
      age,
      clinicalActive,
      lastActivity: activity,
      alerts: alertCount,
      contraceptive,
      nextPeriod: `Em ${nextPeriodDays} dias`,
    });
  }

  // Sort by last activity (most recent first)
  return patients.sort((a, b) => {
    const activityOrder: { [key: string]: number } = {
      'Há 1 hora': 0,
      'Há 2 horas': 1,
      'Há 3 horas': 2,
      'Há 5 horas': 3,
      'Hoje': 4,
      'Ontem': 5,
      'Há 2 dias': 6,
      'Há 3 dias': 7,
      'Esta semana': 8,
      'Semana passada': 9,
    };
    return (activityOrder[a.lastActivity] || 10) - (activityOrder[b.lastActivity] || 10);
  });
};

export const mockPatients = generatePatients();
