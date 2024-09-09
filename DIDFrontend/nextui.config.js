// nextui.config.js
module.exports = {
    plugins: [
      nextui({
        themes: {
          light: {
            colors: {
              primary: '#007bff', // Blue color for buttons
              primaryHover: '#0056b3', // Darker blue for button hover
              inputBorder: '#007bff', // Blue color for input borders
              inputHover: '#0056b3', // Darker blue for input hover
            },
          },
          dark: {
            colors: {
              primary: '#007bff',
              primaryHover: '#0056b3',
              inputBorder: '#007bff',
              inputHover: '#0056b3',
            },
          },
          // ... custom themes
        },
      }),
    ],
  };
  