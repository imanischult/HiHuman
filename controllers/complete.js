module.exports = function () {
    return function complete (req, res, next) {
      if (req.user) { 
       var me = req.user;
       return me;
    };
    
  };
};