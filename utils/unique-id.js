module.exports = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxx-xxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 18 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(18);
    });
};
