const isNullOrWhitespace = (input: string) => {
    return !input || !input.trim();
};

const stringUtil = {
    isNullOrWhitespace,
};

export default stringUtil;