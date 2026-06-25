const verificationTemplate = (otp) => {
  return `
    <h2>Hello user</h2>
    <p>Code for varification.</p>
    ${otp}

  `;
};

module.exports = { verificationTemplate };
