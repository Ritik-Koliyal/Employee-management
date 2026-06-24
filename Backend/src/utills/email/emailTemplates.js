const verificationTemplate = (firstName, url) => {
  return `
    <h2>Hello ${firstName}</h2>
    <p>Click below to verify your email in our system.</p>

    <a href="${url}">
      Verify Email
    </a>
  `;
};

module.exports = { verificationTemplate };
