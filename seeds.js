const mongoose = require('mongoose');
const Saamaan = require('./models/saamaan-model');
var data = [{
        name:"Nepal",
        img:"https://wallpaperaccess.com/full/1410601.jpg",
        desc:"Nepal, officially the Federal Democratic Republic of Nepal, is a country in South Asia. It is located mainly in the Himalayas, but also includes parts of the Indo-Gangetic Plain."
    },
    {
        name:"United States",
        img:"https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg",
        desc:"The U.S. is a country of 50 states covering a vast swath of North America, with Alaska in the northwest and Hawaii extending the nation’s presence into the Pacific Ocean."
    },
    {
        name:"France",
        img:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png",
        desc:"France, in Western Europe, encompasses medieval cities, alpine villages and Mediterranean beaches. Paris, its capital, is famed for its fashion houses, classical art museums including the Louvre and monuments like the Eiffel Tower. The country is also renowned for its wines and sophisticated cuisine."
    }
]
function seedDB() {
    //Remove all campgrounds
    Saamaan.deleteMany({},function(err,allcampgroundRemoved){
        if(err){
            console.log(err);
        }else {
            console.log('Removed Campground');
              //add a few campgrounds
            data.forEach(function(seed){
                Saamaan.create(seed,function(err,saamaan){
                    if(err){
                        console.log(err);
                    }else {
                        console.log("added a saamaan");
                    }
                });
            });
        }
    });
}
module.exports = seedDB;
