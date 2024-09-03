import React from 'react';

const SwitchSelector = (props) => {
  const {defaultTool, setDefaultTool, options} = props;

  return (
    <div style={styles.container}>
     {options.map(item => (
          <button
          onClick={() => setDefaultTool({default_tool: item.value})}
          style={{
            ...styles.button,
            backgroundColor: defaultTool.default_tool === item.value ? '#0A2C59' : 'white',
            color: defaultTool.default_tool === item.value ? 'white' : '#0A2C59',
            borderRadius: '8px'
          }}
        >
          {item.label}
        </button>
     ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '100%',
    margin: '0 auto',
    marginBottom: '20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    margin: '5px',
    outline: 'none',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default SwitchSelector;
