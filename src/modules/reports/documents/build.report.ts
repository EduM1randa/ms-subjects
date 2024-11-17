import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

const logo: Content = {
  image: 'src/assets/colegio-icon.png',
  width: 70,
};

const styles: StyleDictionary = {
  h1: {
    fontSize: 19,
    bold: true,
    margin: [0, 10],
  },
  header: {
    italics: true,
    alignment: 'left',
  },
};

export const pdfReport = (): TDocumentDefinitions => {
  return {
    content: [
      {
        columns: [
          {
            text: [
              {text: 'Colegio Bajos del Cerro Pequeño\n', bold: true}, 
              'La Serena, Chile'
            ],
            style: 'header',
          },
          logo,
        ]
      },
      {
        margin: [0, 20],
        text: 'Reporte de Notas',
        style: 'h1',
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 10,
            x2: 520,
            y2: 10,
            lineWidth: 1,
          }
        ]
      },
      {
        margin: [0, 15],
        columns: [
          {
            text: ['Nombre del Alumno:\n', 'Rut:\n', 'Curso:\n', 'Fecha:\n'],
            bold: true,
            fontSize: 13,
          },
          {
            text: ['Eduardo Branco Miranda Cortés\n', '12.345.678-9\n', '1º Medio\n', '17/11/2024\n'],
            alignment: 'right',
            fontSize: 13,
          },
        ],
      },
      {
        margin: [0, 20],
        layout: 'lightHorizontalLines',
        table: {
          widths: ['*', 'auto'],
          body: [
            [{text: 'Asignatura', alignment: 'left'}, {text: 'Nota', alignment: 'right'}],
            ['Matemáticas', '6.5'],
            ['Lenguaje', '7.0'],
            ['Historia', '6.0'],
            ['Ciencias', '6.5'],
            ['Inglés', '6.0'],
            [
              {},{}
            ],
            [
              {
                text:'% Asistencia: ', alignment:'right', fontSize: 13.5
              }, 
              {
                text: '100',
                fontSize: 13.5
              }
            ],
            [
              {
                text:'Promedio General: ', 
                alignment:'right', 
                fillColor: 'black', 
                color: 'white', 
                bold: true,
                fontSize: 13.5
              }, 
              {
                text: '6.4', 
                fillColor: 'black', 
                alignment: 'left', 
                color: 'white', 
                bold: true,
                fontSize: 13.5
              },
            ],
          ],
        },
      },
      {
        margin: [0, 20],
        text: 'Justificaciones:',
      }
    ],
    styles: styles,
  };
};
