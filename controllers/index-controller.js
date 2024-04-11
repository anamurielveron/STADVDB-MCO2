const getIndex = (req, res) => {
    res.render('index', {title: `Home`});
};

export {getIndex};