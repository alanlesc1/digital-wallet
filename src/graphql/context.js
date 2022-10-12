const context = async ({ req }) => {
    const ctx = req.auth ? req.auth : null;
    return { ctx };
};

export default context;
