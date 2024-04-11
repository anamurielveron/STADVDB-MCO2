const index = (req, res) => {
    res.render('index', {title: `Home`});
};

export {index};